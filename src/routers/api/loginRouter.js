import { signUserIn } from "#controllers/api/userSignInController.js";
import express from 'express';

const loginRouter = express.Router();

// api/account/login
loginRouter.post('/', signUserIn);

export default loginRouter;