import testMenuItemsDb from "#data-stores/testMenuItemsDb.js";
import { body } from "express-validator";
function loginGet(req, res) {
  res.render("login");
}

const loginPost = [
  (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      req.body.error_message = "Please enter your email.";
    } else if (!password) {
      req.body.error_message = "Please enter your password.";
    } else if (!testMenuItemsDb.checkIfUser(email)) {
      req.body.error_message = "User does not exist.";
    } else if (!testMenuItemsDb.checkUserPassword(email, password)) {
      req.body.error_message = "Incorrect password.";
    }
    next();
  },
  (req, res) => {
    const errorMessage = req.body.error_message;
    if (errorMessage) {
      res.render("login", { error_message: errorMessage });
      return;
    }
    // create session for user
    sessionStorage.setItem("email", req.body.email);
    res.redirect("/dashboard");
  },
];

export { loginGet, loginPost };
