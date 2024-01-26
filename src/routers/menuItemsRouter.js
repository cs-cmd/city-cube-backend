import * as dash from "#controllers/menuItemsController.js";
import express from "express";

const menuItemsRouter = express.Router();

menuItemsRouter.get("/", dash.menuItemsGet);

menuItemsRouter.get("/add", dash.menuItemsAddGet);
menuItemsRouter.post("/add", dash.menuItemsAddPost);
menuItemsRouter.get("/:id/edit", dash.menuItemsEditGet);
menuItemsRouter.post("/:id/edit", dash.menuItemsEditPost);
menuItemsRouter.get("/:id/delete", dash.menuItemsDeleteGet);
menuItemsRouter.post("/:id/delete", dash.menuItemsDeletePost);

export default menuItemsRouter;
