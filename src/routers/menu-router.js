import { client } from "../server.js";
import express from "express";
const menuItemsRouter = express.Router();

/**
 * Gets all menu items as an array
 */
async function getMenuItems() {
  return await client
    .execute(
      "select item_id, name, price, description, amount_in_stock, group_concat(flavor, ',') flavors from menu_items join flavors on menu_items.item_id = flavors.menu_item_id group by item_id",
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log("Error gathering menu items: ", err);
    });
}

menuItemsRouter.get("/", (req, res) => {
  return getMenuItems().then((menuItems) => {
    const formattedMenuItems = menuItems.map((item) => {
      return {
        id: item.item_id,
        name: item.name,
        price: item.price,
        description: item.description,
        amount_in_stock: item.amount_in_stock,
        flavors: item.flavors.split(","),
      };
    });
    res.send(formattedMenuItems);
  });
});

export default menuItemsRouter;
