import sessions from '#util/sessions.js';

function checkIfSignedIn(req, res, next) {
  const sessionId = req.cookies['session-id'];

  if(!sessions.isValidSession(sessionId)) {
    res.redirect('/login');
  } else {
    next();
  }
}

// gets basic user data
function dashboardHomeGet(req, res) {
  console.log(req.cookies['session-id']);
  res.render("dashboard");
}

export { checkIfSignedIn, dashboardHomeGet };
