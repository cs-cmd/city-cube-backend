// create server
// on GET to /menu-search, validate sender
// if sender is valid, use passed in (optional) params to
// gather data from
import express from "express";
import { createClient } from "@libsql/client";
import cors from "cors";
import menuItemsRouter from "./routers/MenuRouter.js";
const __dirname = new URL(".", import.meta.url).pathname;

const app = express();
const port = process.env.SERVER_PORT || 3000;
// const whitelist = ['http://localhost:5000'];
const corsOptions = {
  origin: "http://localhost:5000",
  optionsSuccessStatus: 200,
};

const client = createClient({
  url: process.env.LIBSQL_CONN,
  authToken: process.env.TURSO_DB_API_TOKEN,
});

console.log(app.address);

app.get("/", (req, res) => {
  res.send("CityCube Server :: /menu-search");
});

app.use("/menu-search", menuItemsRouter);

app.listen(port, () => {
  console.log(`:: CityCube server listening on port: ${port} ::`);
});

export { client };
