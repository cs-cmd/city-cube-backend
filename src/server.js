import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import dashboardRouter from "#routers/site/dashboardRouter.js";
import loginRouter from "#routers/site/loginRouter.js";
import logoutRouter from '#routers/site/logoutRouter.js';
import session from 'express-session';
import appSession from "#util/sessions.js";
import passport from 'passport';
import { localStrategy, serailizeUser, deserializeUser } from "#util/LocalStrategy.js";
config();

const app = express();
const port = process.env.SERVER_PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(session({secret: 'cats', resave: false, saveUninitialized: true}));
app.use(appSession);
app.use(express.static(__dirname + "/res"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/dashboard", dashboardRouter);
app.use("/login", loginRouter);
app.use('/logout', logoutRouter);

app.listen(port, () => {
  console.log(`:: CityCube server running on port: ${port} ::`);
});
