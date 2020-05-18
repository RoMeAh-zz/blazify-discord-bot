const Route = require("../lib/Route");

module.exports = class extends Route {
  constructor() {
    super("/api/auth");
  }

  run(bot, app, req, res) {
    return res.json({ success: true, redirect: bot.oauthURL });
  }
};
