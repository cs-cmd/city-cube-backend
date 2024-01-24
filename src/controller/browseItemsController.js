import express from "express";
import { client } from "#src/server.js";

const browseItemsController = express.Router();

function browseMainMenu(req, res) {
  res.render("browse");
}

function queryAllMenuItems(req, res, next) {
  // query all items from menu_items
  const menuItems = {
    name: "soup",
  };
  next();
}
function browseMainMenuRedirect(req, res) {
  const { display_items, result_type } = req.body;
  console.log("in redirect post");
  console.log(req.body);
  res.render("browse", {
    result_type,
    display_items,
  });
}

function queryAllUsers(req, res, next) {
  res.render("browse", {
    result_type: "users",
    display_items: {
      name: "Product",
    },
  });
}

function queryAllFlavors(req, res) {
  // query all items from flavors
}

browseItemsController.get("/", browseMainMenu);
browseItemsController.get(
  "/menu-items",
  queryAllMenuItems,
  browseMainMenuRedirect,
);
browseItemsController.get("/users", queryAllUsers, browseMainMenuRedirect);

export default browseItemsController;
