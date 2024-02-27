import menuItemsApiRouter from "./menuItemsApiRouter.js";
import loginRouter from "./loginRouter.js";
import express from 'express';

const apiRouter = express.Router();

apiRouter.use('/menu-items', menuItemsApiRouter);
apiRouter.use('/account/login', loginRouter);

export default apiRouter;