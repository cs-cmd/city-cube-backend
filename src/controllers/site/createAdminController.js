import { body, validationResult } from 'express-validator';
import cityCubeDb from '#clients/tursoCityCubeClient.js';
import bcrypt from 'bcryptjs';

function renderPage(res, errMsg = null) {
    const error = errMsg ? { error_message: errMsg } : null;
    res.render('features/register-user', error);
}

function createUserGet(req, res, next) {
    renderPage(res);
}

const createUserPost = [
    body('email', 'Email is required')
    .trim()
    .isEmail()
    .escape(),
    body('password', 'Password is required')
    .trim()
    .escape(),
    async (req, res, next) => {
        const isEmailInUse = await cityCubeDb.isValidUser(req.body.email);

        if (isEmailInUse) {
            renderPage(res, 'Email already in use');
            return;
        }
        next();
    },
    async (req, res, next) => {
        const errorMessage = req.body.error_message;
        if(errorMessage) {
            renderPage(res, errorMessage);
            return;
        }

        const email = req.body.email;
        const password = req.body.password;

        const successfullyAdded = await cityCubeDb.addUser(email, password, 'admin');

        if (successfullyAdded) {
            res.redirect('/dashboard');
        } else {
            renderPage(res, 'Failed to create admin user account');
        }
    }
];

export { 
    createUserGet,
    createUserPost
}
