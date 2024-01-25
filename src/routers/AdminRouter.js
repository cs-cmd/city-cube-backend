import express from "express";
import { body, validationResult } from "express-validator";

const adminRouter = express.Router();

const loginPost = [
  body("email", "Please enter an email")
    .trim()
    .notEmpty()
    .withMessage("Please enter a valid email")
    .bail()
    .escape(),
  body("password", "Please enter a password")
    .trim()
    .notEmpty()
    .withMessage("Please enter a valid password")
    .bail()
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      next();
      // res.render("main", {
      //   error_message: errors.array()[0].msg,
      // });
      return;
    }
    const { email, password } = req.body;
    res.send("login");
  },
];

adminRouter.post("/login", loginPost);

export default adminRouter;
