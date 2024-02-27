import loginRouter from "./loginRouter.js";
import express from 'express';

const accountRouter = express.Router();

accountRouter.use('/login', loginRouter);

export default accountRouter;