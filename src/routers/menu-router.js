import { client } from "../server.js";
import express from "express";
const menuItemsRouter = express.Router();

/**
 * Gets all menu items as an array
 */
async function getMenuItems() {
  return await client
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

async function getMenuItemImageLinks(itemId) {
  const images = await client
    .execute({
      sql: "select group_concat('http://localhost:3000/public/images/menu_items/' || image_url, ',') urls from menu_item_image_urls where item_id = ? group by item_id",
      args: [itemId],
    })
    .then((res) => {
      if (!res.rows || res.rows.length === 0) {
        return [];
      }
      return res.rows[0].urls.split(",");
    })
    .catch((err) => {
      return [];
    });
  return images;
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

  const formattedMenuItemsWithImages = [];

  for (let i = 0; i < formattedMenuItems.length; i++) {
    const images = await getMenuItemImageLinks(formattedMenuItems[i].item_id);
    const itemToAdd = {
      ...formattedMenuItems[i],
      images: images,
    };
    formattedMenuItemsWithImages.push(itemToAdd);
  }

  res.json(formattedMenuItemsWithImages);
});

export default menuItemsRouter;
