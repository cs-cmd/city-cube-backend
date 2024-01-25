import express from "express";
import tursoCityCubeClient from "#clients/tursoCityCubeDbClient.js";
const menuItemsRouter = express.Router();

/**
 * Gets all menu items as an array
 */
async function getMenuItems() {
  return await tursoCityCubeClient
    .execute(
      "select menu_items.item_id, name, price, description, amount_in_stock, group_concat(flavor, ',') flavors from menu_items join flavors on menu_items.item_id = flavors.item_id group by menu_items.item_id",
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log("Error gathering menu items: ", err);
      return [];
    });
}

menuItemsRouter.get("/", async (req, res) => {
  const menuItems = await getMenuItems();
  const formattedMenuItems = menuItems.map((item) => {
    return {
      item_id: item.item_id,
      name: item.name,
      price: item.price,
      description: item.description,
      amount_in_stock: item.amount_in_stock,
      flavors: item.flavors.split(","),
    };
  });

  res.json(formattedMenuItems);
});

export default menuItemsRouter;
