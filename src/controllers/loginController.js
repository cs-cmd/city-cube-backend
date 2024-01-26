import testMenuItemsDb from "#data-stores/testMenuItemsDb.js";
import { body } from "express-validator";
function loginGet(req, res) {
  res.render("login");
}

const loginPost = [
  body("email", "Email is required"),
  body("password", "Password is required"),
  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  },
];
