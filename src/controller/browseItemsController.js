import express from "express";

const browseItemsController = express.Router();

function browseMainMenu(req, res) {
  res.render("browse");
}

browseItemsController.get("/", browseMainMenu);

export default browseItemsController;
