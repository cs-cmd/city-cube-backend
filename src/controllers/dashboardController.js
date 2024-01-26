const dashboardHomeGet = [
  (req, res, next) => {
    // if user not logged in, redirect to login
    // res.redirect("/login");
    next();
  },
  (req, res) => {
    res.render("dashboard");
  },
];

export { dashboardHomeGet };
