import * as login from "#controllers/site/loginController.js";
import express from "express";

const loginRouter = express.Router();

loginRouter.get("/", login.loginGet);
loginRouter.post("/", login.loginPost);

export default loginRouter;
