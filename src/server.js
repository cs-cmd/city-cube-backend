import express from "express";
import session from "express-session";
import passport from "passport";
import Strategy from "passport-local";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
config();

import dashboardRouter from "#routers/site/dashboardRouter.js";
import loginRouter from "#routers/site/loginRouter.js";

const app = express();
const port = process.env.SERVER_PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/res"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/dashboard", dashboardRouter);
app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`:: CityCube server running on port: ${port} ::`);
});
