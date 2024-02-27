import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import dashboardRouter from "#routers/site/dashboardRouter.js";
import loginRouter from "#routers/site/loginRouter.js";
import logoutRouter from '#routers/site/logoutRouter.js';
import apiRouter from "#routers/api/apiRouter.js";
import cors from 'cors';
import cityCubeDb from '#clients/tursoCityCubeClient.js';

config();

const allowList = ['http://localhost:5173'];
const corsOptions = {
  origin: 'https://localhost:5173',
  optionsSuccessStatus: 200
};

const app = express();
const port = process.env.SERVER_PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(cookieParser());
app.use(express.static(__dirname + "/res"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/dashboard", dashboardRouter);
app.use("/login", loginRouter);
app.use('/logout', logoutRouter);

app.use('/api', cors(corsOptions), apiRouter);

app.listen(port, () => {
  console.log(`:: CityCube server running on port: ${port} ::`);
});
