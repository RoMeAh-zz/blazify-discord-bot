const Route = require("../lib/Route");

module.exports = class extends Route {
  constructor() {
    super("/api/auth");
  }

  run(client, app, req, res) {
    return res.json({ success: true, redirect: client.oauthURL });
  }
};
