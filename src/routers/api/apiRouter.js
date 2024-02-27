import menuItemsApiRouter from "./menuItemsApiRouter.js";
import accountRouter from "./accountRouter.js";
import express from 'express';

const apiRouter = express.Router();

apiRouter.use('/menu-items', menuItemsApiRouter);
apiRouter.use('/account', accountRouter);

export default apiRouter;