import * as login from "#controllers/loginController.js";
import express from "express";

const loginRouter = express.Router();

loginRouter.get("/", login.loginGet);
loginRouter.post("/", login.loginPost);

export default loginRouter;
