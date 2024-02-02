import menuItemsApiRouter from "./menuItemsApiRouter.js";
import express from 'express';

const apiRouter = express.Router();

apiRouter.use('/menu-items', menuItemsApiRouter);

export default apiRouter;