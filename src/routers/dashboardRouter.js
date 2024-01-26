import express from "express";
import * as dash from "#controllers/dashboardController.js";
import menuItemsRouter from "#routers/menuItemsRouter.js";

const dashboardRouter = express.Router();

// dashboardRouter.use((req, res, next) => {
//    if (req.user) {
//      next();
//    } else {
//   res.redirect("/login");
//   }
// });
dashboardRouter.get("/", dash.dashboardHomeGet);
dashboardRouter.use("/menu-items", menuItemsRouter);

export default dashboardRouter;
