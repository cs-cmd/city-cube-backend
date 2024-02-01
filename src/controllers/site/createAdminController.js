import testUserItemsDb from '#data-stores/testUserItemsDb.js';
import { body, validationResult } from 'express-validator';
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
    (req, res, next) => {
        // check if email is already in use
        next();
    },
    (req, res, next) => {
        const errorMessage = req.body.error_message;
        if(errorMessage) {
            renderPage(res, errorMessage);
            return;
        }

        const email = req.body.email;
        const password = req.body.password;

        // Hash password
        // add user to db
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if(err) {
                renderPage(res, err);
                return;
            }

            testUserItemsDb.addUser(email, hashedPassword, 'admin');
            res.redirect('/dashboard');
        })
    }
];

export { 
    createUserGet,
    createUserPost
}