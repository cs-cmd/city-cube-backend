import tursoCityCubeClient from "#clients/tursoCityCubeClient.js";

// gets basic user data
function dashboardHomeGet(req, res) {
  res.render("dashboard");
}

export { dashboardHomeGet };
