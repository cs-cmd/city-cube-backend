import express from "express";
import * as dash from "#controllers/site/dashboardController.js";
import menuItemsRouter from "#routers/site/menuItemsRouter.js";
import createAdminRouter from "#routers/site/createAdminRouter.js";

const dashboardRouter = express.Router();

dashboardRouter.use(dash.checkIfSignedIn);
dashboardRouter.get("/", dash.dashboardHomeGet);
dashboardRouter.use("/menu-items", menuItemsRouter);
dashboardRouter.use('/create-admin', createAdminRouter);

export default dashboardRouter;
