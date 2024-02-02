import { logoutPost } from "#controllers/site/logoutController.js";
import express from 'express';

const logoutRouter = express.Router();

logoutRouter.post('/', logoutPost);

export default logoutRouter;