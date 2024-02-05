import { createClient } from "@libsql/client";
import { config } from 'dotenv';
config();

const cityCubeDb = (() => {
  const tursoCityCubeClient = createClient({
    url: process.env.LIBSQL_CONN,
    authToken: process.env.TURSO_DB_API_TOKEN,
  });

  // Retreives all menu items from  database
  const getAllMenuItems = async () => {
    const menuItems = await tursoCityCubeClient.execute(
      "select * from menu_items;",
    );
    return menuItems.rows;
  };

  const getMenuItem = async (id) => {
    // sanitize input here
    const menuItem = await tursoCityCubeClient.execute(
      `select * from menu_items where item_id = ${id};`
    );

    return menuItem.rows[0];
  };

  const addMenuItem = async (newItem) => {
    const wasSuccessful = await tursoCityCubeClient.execute(
      `insert into menu_items(name, price, description, amount_in_stock) values(${newItem.name}, ${newItem.price}, ${newItem.description}, ${newItem.amountInStock});`
    );

    return wasSuccessful;
  };

  const updateMenuItem = async (newItem) => {

    const menuItemUpdateFields = [
      'name',
      'price',
      'description',
      'amount_in_stock'
    ];

    const menuItem = await getMenuItem(item);

    if(!menuItem) {
      throw new Error("Update item not found in db");
    }

    let updateStatements = '';

    for(let i = 0; i < menuItemUpdateFields.length; i++) {
      let key = menuItemUpdateFields[i];

      // if update statements isn't null, add comma to separate
      if(updateStatements !== null) {
        updateStatements.concat(',');
      }

      if(menuItem[key] !== newItem[key]){
        updateStatements.concat(`set ${key} = ${newItem[key]}`);
      }
    }
    
    const wasSuccessful = await tursoCityCubeClient.execute(
      `update menu_items ${updateStatements} where item_id = ${menuItem.item_id};`
    );

    return wasSuccessful;
  }

  const deleteMenuItem = async (id) => {
    // potential issue here with users passing in malicious code; refactor
    // sanitize data, since this could be user provided
    await tursoCityCubeClient.execute(
      `delete from menu_items where id = ${id};`,
    );
  };

  return {
    getAllMenuItems,
    getMenuItem,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
})();

export default cityCubeDb;
