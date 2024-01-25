const testMenuItems = [
  {
    name: "block",
    price: 20,
    description: "test",
    quantity: 100,
  },
];

function menuItemsGet(req, res) {
  res.render("features/menu-items");
}

export { menuItemsGet };
