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
  const deleteItem = testMenuItemsDb.getItem(id);
  if (!deleteItem) {
    console.log("error");
    res.redirect("/dashboard/menu-items");
    return;
  }

  res.render("features/delete-menu-item", {
    candidate_delete_item: deleteItem,
  });
}

const menuItemsDeletePost = [
  (req, res, next) => {
    const adminPassword = req.body.admin_password;
    if (!adminPassword) {
      req.body["error_message"] = "Please enter your password";
      next();
    }

    const confirmed = testMenuItemsDb.confirmAction(adminPassword);
    if (!confirmed) {
      req.body["error_message"] = "Incorrect password";
      next();
    }
    next();
  },
  (req, res) => {
    const id = req.params.id;

    const errorMessage = req.body.error_message;
    if (errorMessage) {
      const deleteItem = testMenuItemsDb.getItem(id);
      res.render("features/delete-menu-item", {
        error_message: errorMessage,
        candidate_delete_item: deleteItem,
      });
      return;
    }

    // const wasDeleted = cityCubeDb.deleteMenuItem(id);
    const wasDeleted = testMenuItemsDb.removeItem(id);
    if (!wasDeleted) {
      console.log("Error deleting item");
    }

    res.redirect("/dashboard/menu-items");
  },
];
function menuItemsAddGet(req, res) {
  res.render("features/add-edit-menu-item", {
    refactor_type: "Add",
    post_url: "/dashboard/menu-items/add/",
  });
}

const menuItemsAddPost = [
  (req, res) => {
    const adminPassword = req.body.admin_password;
    const confirmed = testMenuItemsDb.confirmAction(adminPassword);
    const newItem = {
      name: req.body.item_name,
      price: req.body.price,
      description: req.body.description,
      amount_in_stock: req.body.amount_in_stock,
    };

    if (!confirmed) {
      res.render("features/add-edit-menu-item", {
        refactor_type: "Add",
        post_url: "/dashboard/menu-items/add/",
        edit_item: newItem,
        error_message: "Incorrect password",
      });
      return;
    }

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
