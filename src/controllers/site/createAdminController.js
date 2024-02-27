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
    async (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;

        let errorMessage = '';

        if(!email) {
            errorMessage = 'Email is required';
        } else if (!password) {
            errorMessage = 'Password is required';
        }

        const isEmailInUse = await cityCubeDb.isValidUser(req.body.email);

        if (isEmailInUse) {
            errorMessage = 'Email is already in use';
        }

        if(errorMessage) {
            renderPage(res, errorMessage);
            return;
        }

        next();
    },
    async (req, res, next) => {
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
