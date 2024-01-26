import cityCubeDb from "#clients/tursoCityCubeClient.js";
import testMenuItemsDb from "#data-stores/test-menu-items.js";

async function menuItemsGet(req, res) {
  // const menu_items = cityCubeDb.getAllMenuItems();
  const menuItems = testMenuItemsDb.getItems();
  res.render("features/menu-items", {
    display_items: menuItems,
  });
}

function menuItemsEditGet(req, res) {
  const id = req.params.id;
  const editItem = testMenuItemsDb.getItem(id);
  res.render("features/add-edit-menu-item", {
    edit_item: editItem,
    refactor_type: "Edit",
    post_url: `/dashboard/menu-items/${id}/edit/`,
  });
}

const menuItemsEditPost = [
  (req, res) => {
    const editedItem = {
      item_id: req.params.id,
      name: req.body.item_name,
      price: req.body.price,
      description: req.body.description,
      amount_in_stock: req.body.amount_in_stock,
    };

    testMenuItemsDb.updateItem(editedItem);

    res.redirect("/dashboard/menu-items");
  },
];

function menuItemsDeleteGet(req, res) {
  const id = req.params.id;
  const deleteItem = testMenuItems.find((item) => item.item_id == id);
  if (!deleteItem) {
    console.log("error");
    res.redirect("/dashboard/menu-items");
    return;
  }

  res.render("features/delete-menu-item", {
    candidate_delete_item: deleteItem,
  });
}

function menuItemsDeletePost(req, res) {
  const id = req.params.id;
  // const wasDeleted = cityCubeDb.deleteMenuItem(id);
  const wasDeleted = testMenuItemsDb.removeItem(id);
  if (!wasDeleted) {
    console.log("Error deleting item");
  }

  res.redirect("/dashboard/menu-items");
}

function menuItemsAddGet(req, res) {
  res.render("features/add-edit-menu-item", {
    refactor_type: "Add",
  });
}

const menuItemsAddPost = [
  (req, res) => {
    const newItem = {
      name: req.body.item_name,
      price: req.body.price,
      description: req.body.description,
      amount_in_stock: req.body.amount_in_stock,
    };

    testMenuItemsDb.addItem(newItem);

    res.redirect("/dashboard/menu-items");
  },
];

export {
  menuItemsGet,
  menuItemsEditGet,
  menuItemsEditPost,
  menuItemsDeleteGet,
  menuItemsDeletePost,
  menuItemsAddGet,
  menuItemsAddPost,
};
