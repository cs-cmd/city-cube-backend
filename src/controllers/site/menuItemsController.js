import cityCubeDb from "#clients/tursoCityCubeClient.js";
import { body, validationResult } from 'express-validator';

async function menuItemsGet(req, res) {
  const menuItems = await cityCubeDb.getAllMenuItems();
  res.render("features/menu-items", {
    display_items: menuItems,
  });
}

await function menuItemsEditGet(req, res) {
  const id = req.params.id;

  const editItem = await cityCubeDb.getItem(id);

  res.render("features/add-edit-menu-item", {
    edit_item: editItem,
    refactor_type: "Edit",
    post_url: `/dashboard/menu-items/${id}/edit/`,
  });
}

const menuItemsEditPost = [
  async (req, res) => {
    const editedItem = {
      name: req.body.item_name,
      price: req.body.price,
      description: req.body.description,
      amount_in_stock: req.body.amount_in_stock,
    };

    await cityCubeDb.updateMenuItem(req.params.id, editedItem);

    res.redirect("/dashboard/menu-items");
  },
];

async function menuItemsDeleteGet(req, res) {
  const id = req.params.id;
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
      next();
    }

    next();
  },
  async (req, res) => {
    const id = req.params.id;
    const errorMessage = req.body.error_message;

    if (errorMessage != null) {
      const deleteItem = await cityCubeDb.getMenuItem(id);
      res.render("features/delete-menu-item", {
        error_message: errorMessage,
        candidate_delete_item: deleteItem,
      });
      return;
    }

    const wasDelete = await cityCube.deleteMenuItem(id);
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
  body('name', 'The name of the item is required')
  .trim()
  .length({min: 3})
  .escape(),
  async (req, res) => {
    const sessionId = req.cookies['session-id'];
    const validationErrors = validationResult(res);

    let errorMessage = '';

    const newItem = {
      name: req.body.item_name,
      price: req.body.price,
      description: req.body.description,
      amount_in_stock: req.body.amount_in_stock,
    };

    if (sessionId == null) {
      errorMessage = 'Invalid user session';
    } else if (validationErrors != null) {
      errorMessage = validationErrors[0];
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
