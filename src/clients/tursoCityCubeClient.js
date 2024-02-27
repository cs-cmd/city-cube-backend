import { createClient } from "@libsql/client";
import { config } from 'dotenv';
config();
import bcrypt from 'bcryptjs';

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
    const menuItem = await tursoCityCubeClient.execute({
      sql: `select * from menu_items where item_id = ?;`,
      args: [id]
    });

    return menuItem.rows[0];
  };

  const addMenuItem = async (newItem) => {
    const wasSuccessful = await tursoCityCubeClient.execute({
      sql: `insert into menu_items(name, price, description, amount_in_stock) values(?, ?, ?, ?);`,
      args: [newItem.name, newItem.price, newItem.description, newItem.amount_in_stock]
    }).rowsAffected != 0;

    return wasSuccessful;
  };

  const updateMenuItem = async (itemId, newItem) => {

    const menuItemUpdateFields = [
      'name',
      'price',
      'description',
      'amount_in_stock'
    ];

    const menuItem = await getMenuItem(itemId);

    if(!menuItem) {
      throw new Error("Update item not found in db");
    }

    let updateStatements = '';

    for(let i = 0; i < menuItemUpdateFields.length; i++) {
      let key = menuItemUpdateFields[i];

      if (newItem[key] == undefined) {
        continue;
      }

      // if item is a string, surround in double quotes
      let formattedValue = typeof newItem[key] == 'string' ? `\"${newItem[key]}\"` : newItem[key];

    // if update statements has no values to set, prefix with 'set', otherwise prefix with a comma to separate updates
      let prefix = updateStatements == '' ? 'set' : ',';
 
      updateStatements += `${prefix} ${key} = ${formattedValue}`;
    }
    
    // used separately-formatted SQL statement here as opposed to 
    // crating statement in .execute(...) call (crashed)
    let sqlStatement = `update menu_items ${updateStatements} where item_id = ${itemId}`;

    const wasSuccessful = await tursoCityCubeClient.execute(sqlStatement);

    return wasSuccessful != undefined && wasSuccessful != 0;
  }

  const deleteMenuItem = async (id) => {
    // potential issue here with users passing in malicious code; refactor
    // sanitize data, since this could be user provided
    const result = await tursoCityCubeClient.execute(
      `delete from menu_items where item_id = ${id};`,
    ).rowsAffected != 0;

    return result;
  };


  const isValidUser = async (email) => {
    const userInstance = await tursoCityCubeClient.execute(
      `select 'Y' from users where email = "${email}";`
    );

    return userInstance.rows[0] != null && userInstance.rows[0] != undefined;
  }

  const isCorrectPassword = async (email, password) => {
    const isUser = await isValidUser(email);

    if(!isUser) {
      return false;
    }

    let isPasswordCorrect = false;

    const storedPasswordRow = (await tursoCityCubeClient.execute(
      `select password from users where email = "${email}";`
    )).rows[0];

    if(!storedPasswordRow) {
      return false;
    }

    const storedPassword = storedPasswordRow.password;

    if(!storedPassword) {
      return false;
    }

    return await bcrypt.compare(password, storedPassword).then(res => res);
  }

  const getUser = async(email) => {
    const user = await tursoCityCubeClient.execute(`select email, type, user_id from users where email = "${email}";`);

    return user.rows[0] || null;
  }

  // returns an object that contains a statusCode and either the error message or 
  // the userId and sessionId

  const userSignIn = async(email, password) => {
    // will escape data in future
    const queryResults = await tursoCityCubeClient
                              .execute('select password, user_id from users where email=?', email)
                              .rows[0];

    if(!queryResults) {
      return {
        statusCode: 401,
        msg: "User not found"
      };
    }

    const passwordsMatch = await bcrypt.compare(password, queryResults.password).then(res => res);

    if(!passwordsMatch) {
      return {
        statusCode: 401,
        msg: "Incorrect password"
      };
    }

    // create and insert sessionId
    let sessionId = 'TEST';
    // insert into sessions value (sessionId, email);
    return {
      statusCode: 200,
      userId: queryResults.user_id,
      sessionId,
    }
  }

  const addUser = async (email, password, type) => {
    let wasSuccessful = false;
    const hashedPassword = await bcrypt.hash(password, 10)
    .then(res => res)
    .catch(err => false);

    // hashing error encountered, return
    if (hashedPassword == false) {
      return false;
    }


    // use rowsAffected to determine if the insert operation was successful
    // Probably a better way to handle this
    const rowsAffected = (await tursoCityCubeClient.execute(
        `insert into users(email, password, type, date_created) values("${email}", "${hashedPassword}", "${type}", date());`
    )).rowsAffected;

    return rowsAffected >= 1;
  }

  return {
    getAllMenuItems,
    getMenuItem,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    isValidUser, 
    isCorrectPassword,
    getUser,
    addUser,
    userSignIn
  };
})();

export default cityCubeDb;
