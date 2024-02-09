import { body, validationResult } from "express-validator";
import sessions from "#util/sessions.js";
import cityCubeDb from '#clients/tursoCityCubeClient.js';

function loginGet(req, res) {
  res.render("login");
}

const loginPost = [
  body('email', 'Email is required')
  .trim()
  .isEmail()
  .escape(),
  body('password', 'Password is required')
  .trim()
  .escape(),
  async (req, res, next) => {
    const result = validationResult(req);

    if(!result.isEmpty()) {
      req.body.error_message = result.array[0];
      next();
    }

    const email = req.body.email;
    // hash password here
    const password = req.body.password;

    const isUser = await cityCubeDb.isValidUser(email);

    if(!isUser) {
      req.body.error_message = 'User does not exist';
      next();
    }

    const isCorrectPassword = await cityCubeDb.isCorrectPassword(email, password);

    if(!isCorrectPassword) {
      req.body.error_message = 'Password is incorrect';
      next();
    }

    next();
  },
  async (req, res) => {
    const errorMessage = req.body.error_message;
    if (errorMessage != null) {
      res.render("login", { error_message: errorMessage });
      return;
    }

    const user = await cityCubeDb.getUser(req.body.email);

    const sessionId = await sessions.addSession(user);

    res.cookie('session-id', sessionId);
    res.redirect('/dashboard');
  },
];

export { loginGet, loginPost };
