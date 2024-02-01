function checkIfSignedIn(req, res, next) {
  const user = null; //get email/username
  if(!user) {
    res.redirect('/login');
  } else {
    next();
  }
}

// gets basic user data
function dashboardHomeGet(req, res) {
  res.render("dashboard");
}

export { checkIfSignedIn, dashboardHomeGet };
