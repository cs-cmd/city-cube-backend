import cityCubeDb from "#clients/tursoCityCubeClient.js";
const testMenuItems = [
  {
    item_id: 0,
    name: "block",
    price: 20,
    description: "test",
    amount_in_stock: 100,
  },
  {
    item_id: 1,
    name: "cube",
    price: 10,
    description: "test",
    amount_in_stock: 100,
  },
];

async function menuItemsGet(req, res) {
  // const menu_items = cityCubeDb.getAllMenuItems();
  const menuItems = testMenuItems;
  res.render("features/menu-items", {
    display_items: menuItems,
  });
}

export { menuItemsGet };
