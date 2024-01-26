import {
  menuItemsGet,
  menuItemsEditGet,
  menuItemsEditPost,
  menuItemsDeleteGet,
  menuItemsDeletePost,
} from "#controllers/menuItemsController.js";
import express from "express";

const menuItemsRouter = express.Router();

menuItemsRouter.get("/", menuItemsGet);

//menuItemsRouter.get('/add',)
// menuItemsRouter.post('/add');
menuItemsRouter.get("/:id/edit", menuItemsEditGet);
menuItemsRouter.post("/:id/edit", menuItemsEditPost);
menuItemsRouter.get("/:id/delete", menuItemsDeleteGet);
menuItemsRouter.post("/:id/delete", menuItemsDeletePost);

export default menuItemsRouter;
