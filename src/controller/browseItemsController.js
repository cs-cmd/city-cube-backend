import express from "express";
const browseItemsController = express.Router();

function browseItemsGetMain(req, res) {
  res.render("browse");
}

browseItemsController.get("/", browseItemsGetMain);

export default browseItemsController;
