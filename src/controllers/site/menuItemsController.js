import cityCubeDb from "#clients/tursoCityCubeClient.js";
import { sanitize } from '#util/sanitization.js';

async function menuItemsGet(req, res) {
  const menuItems = await cityCubeDb.getAllMenuItems();
  res.render("features/menu-items", {
    display_items: menuItems,
  });
}

async function menuItemsEditGet(req, res) {
  const id = req.params.id;

  if(isNaN(id)) {
    res.render('features/menu-items', { error_message: 'Invalid Item ID'});
    return;
  }

  const editItem = await cityCubeDb.getMenuItem(id);

  res.render("features/add-edit-menu-item", {
    edit_item: editItem,
    refactor_type: "Edit",
    post_url: `/dashboard/menu-items/${id}/edit/`,
  });
}

const menuItemsEditPost = [
  async (req, res) => {
    const id = req.params.id;

    if(isNaN(id)) {
      res.render('features/add-edit-menu-item', {
        error_message: 'Invalid Item ID',
      });
      return;
    }

    const editedItem = {
      name: req.body.item_name,
      price: req.body.price,
      description: req.body.description,
      amount_in_stock: req.body.amount_in_stock,
    };

    await cityCubeDb.updateMenuItem(id, editedItem);

    res.redirect("/dashboard/menu-items");
  },
];

async function menuItemsDeleteGet(req, res) {
  const id = req.params.id;

  if(isNaN(id)) {
    res.render('features/menu-items', {
      error_message: 'Invalid Item ID'
    });
    return;
  }

  const deleteItem = await cityCubeDb.getMenuItem(id);
  if (deleteItem == null) {
    console.log("Invalid menu item");
    res.redirect("/dashboard/menu-items");
    return;
  }

  res.render("features/delete-menu-item", {
    candidate_delete_item: deleteItem,
  });
}

const menuItemsDeletePost = [
  async (req, res, next) => {
    const sessionId = req.cookies['session-id'];

    if (sessionId == null) {
      req.body.error_message = "Invalid user session";
    } else if (isNaN(req.params.id)) {
      req.body.error_message = "Invalid Item ID";
    }

    next();
  },
  async (req, res) => {
    const id = req.params.id;
    const errorMessage = req.body.error_message;

    if (errorMessage != null && isNaN(id)) {
      let deleteItem = isNaN(id) ? await cityCubeDb.getMenuItem(id) : null;
      res.render("features/delete-menu-item", {
        error_message: errorMessage,
        candidate_delete_item: deleteItem,
      });
      return;
    }

    const wasDeleted = await cityCube.deleteMenuItem(id);
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

// TODO - Finish validation chain
const menuItemsAddPost = [
  async (req, res) => {
    const sessionId = req.cookies['session-id'];
   
    let errorMessage = '';

    const newItem = {
      name: req.body.item_name,
      price: req.body.price,
      description: req.body.description,
      amount_in_stock: req.body.amount_in_stock,
    };

    if (sessionId == null) {
      errorMessage = 'Invalid user session';
    } else if (!newItem.name || !newItem.price
              || newItem.description || newItem.amount_in_stock) {
      errorMessage = 'Enter all fields required';
    }

    if (errorMessage != null) {
      res.render('features/add-edit-menu-item', {
        refactor_type: "Add",
        post_url: "/dashboard/menu-items/add/",
        error_message: errorMessage,
        edit_item: newItem,
      });
      return;
    }

    await cityCubeDb.addMenuItem(newItem);
    
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
