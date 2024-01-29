import express from "express";
import * as dash from "#controllers/site/dashboardController.js";
import menuItemsRouter from "#routers/site/menuItemsRouter.js";

const dashboardRouter = express.Router();

dashboardRouter.use((req, res, next) => {
  const email = sessionStorage.getItem("email");
  if (email) {
    next();
  } else {
    res.redirect("/login");
  }
});
dashboardRouter.get("/", dash.dashboardHomeGet);
dashboardRouter.use("/menu-items", menuItemsRouter);

export default dashboardRouter;
