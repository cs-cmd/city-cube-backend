import testUserItemsDb from '#data-stores/testUserItemsDb.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

function createUserGet(req, res, next) {
    res.render('register-user');
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
        if(!errorMessage) {
            res.render('register-user', {
                error_message: errorMessage,
            });
            return;
        }

        const email = req.body.email;
        const password = req.body.password;

        // Hash password
        // add user to db
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if(err) {
                res.render('register-user', {
                    error_message: err
                });
                return;
            }

            testUserItemsDb.addUser(email, hashedPassword, 'admin');
        })
    }
];

export { 
    createUserGet,
    createUserPost
}