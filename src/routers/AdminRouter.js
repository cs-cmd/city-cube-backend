import express from "express";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

const adminRouter = express.Router();
const users = [
  {
    email: "johndoe@hello.com",
    password: "helpme",
  },
  {
    email: "ppaul@hello.com",
    password: "helpdeargod",
  },
];

adminRouter.post("/login", [
  body("email", "Please enter an email")
    .trim()
    .notEmpty()
    .withMessage("Please enter a valid email")
    .bail()
    .escape()
    .custom(
      asyncHandler((modifiedEmail) => {
        console.log("modifiedEmail: ", modifiedEmail);
        const isValidUserEmail = users.some(
          (user) => user.email === modifiedEmail,
        );
        if (!isValidUserEmail) {
          throw new Error("Email not on file, please check email and retry");
        }
        return true;
      }),
    ),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
    }
    const { email, password } = req.body;
    res.send("login");
  },
]);

export default adminRouter;
