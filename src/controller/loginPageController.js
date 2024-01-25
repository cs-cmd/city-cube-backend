function successfulLoginGet(req, res) {
  res.render("login");
}

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
      return;
    }
    const { email, password } = req.body;

    const isValidLogin = tursoCityCubeClient.execute(
      "select nvl('Y', 'N') from users where email = :email and password = :password",
      { email, password },
    );
    console.log(isValidLogin);

    // redirect to dashboard
    res.send("login");
  },
  (req, res) => {
    console.log("Login failed");
  },
];

export { successfulLoginGet, loginPost };
