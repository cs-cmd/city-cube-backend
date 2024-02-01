import { body, validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import testUserItemsDb from "#data-stores/testUserItemsDb";

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

    if (!(await testUserItemsDb.checkIfUser(email))) {
      req.body.error_message = "User does not exist.";
    }

    bcrypt.hash(password, 10, async(err, hashedPassword) => {
      if(err) {
        req.body.error_message = 'Password check failed';
        next();
      }      

      if(!(await testUserItemsDb.checkUserPassword(email, hashedPassword))) {
        req.body.error_message = 'Password is incorrect';
      }

      next();      
    })
  },
  (req, res) => {
    const errorMessage = req.body.error_message;
    if (errorMessage) {
      res.render("login", { error_message: errorMessage });
      return;
    }

    res.redirect("/dashboard");
  },
];

export { loginGet, loginPost };
