import * as menuItems from "#controllers/site/menuItemsController.js";
import express from "express";

const menuItemsRouter = express.Router();

menuItemsRouter.get("/", menuItems.menuItemsGet);

menuItemsRouter.get("/add", menuItems.menuItemsAddGet);
menuItemsRouter.post("/add", menuItems.menuItemsAddPost);
menuItemsRouter.get("/:id/edit", menuItems.menuItemsEditGet);
menuItemsRouter.post("/:id/edit", menuItems.menuItemsEditPost);
menuItemsRouter.get("/:id/delete", menuItems.menuItemsDeleteGet);
menuItemsRouter.post("/:id/delete", menuItems.menuItemsDeletePost);

export default menuItemsRouter;
