import express from 'express';
import {
    createUserGet,
    createUserPost
} from '#controllers/site/createAdminController.js';

const createAdminRouter = express.Router();

createAdminRouter.get('/', createUserGet);

createAdminRouter.post('/', createUserPost);

export default createAdminRouter;