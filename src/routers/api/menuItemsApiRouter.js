import express from "express";
import { apiMenuItemsGet } from "#controllers/api/menuItemsController.js";

const menuItemsApiRouter = express.Router();

menuItemsApiRouter.get('/', apiMenuItemsGet);

export default menuItemsApiRouter;