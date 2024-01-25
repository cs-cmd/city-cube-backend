import { menuItemsGet } from "#controllers/menuItemsController.js";
import express from "express";

const menuItemsRouter = express.Router();

menuItemsRouter.get("/", menuItemsGet);

export default menuItemsRouter;
