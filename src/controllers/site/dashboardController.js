import sessions from '#util/sessions.js';
import cityCubeDb from '#clients/tursoCityCubeClient.js';

async function checkIfSignedIn(req, res, next) {
  const sessionId = req.cookies['session-id'];

  const isValidSession = await cityCubeDb.isValidSession(sessionId);
  
  if(!isValidSession) {
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
