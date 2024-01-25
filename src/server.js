// create server
// on GET to /menu-search, validate sender
// if sender is valid, use passed in (optional) params to
// gather data from
import express from "express";
import menuItemsRouter from "./routers/api/MenuRouter.js";
import adminRouter from "./routers/AdminRouter.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { config } from "dotenv";
import loginPageController from "#controllers/loginPageController.js";
import browseItemsController from "#controllers/browseItemsController.js";

config();
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.set("view engine", "ejs");
app.set("views", resolve(__dirname, "views"));
app.use(express.static(__dirname + "/res"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.SERVER_PORT || 3000;

app.get("/", mainPageControl);
app.use("/admin", adminRouter);
app.use("/browse", browseItemsController);

app.use("/api/menu-search", menuItemsRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/order', orderRouter);
// app.use('/api/)

app.listen(port, () => {
  console.log(`:: CityCube server listening on port: ${port} ::`);
});
