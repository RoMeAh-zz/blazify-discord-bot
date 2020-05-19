const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const { readdirSync } = require("fs");
const { secret } = require("../../src/config.json");
const Oauth = require("discord-oauth2");

class Server {
  constructor(client) {
    this.client = client;
  }
  
 async run(client) {
  const app = express();

  /** Setup Discord Oauth */
  this.client.oauth = new Oauth({
    clientSecret: secret,
    clientId: this.client.user.id,
    redirectUri: "https://blazify-dashboard.glitch.me/api/callback",
  });

  this.client.oauthURL = this.client.oauth.generateAuthUrl({
    scope: ["guilds", "identify"],
  });

  /** Middleware */
  app.use(cors());
  app.use(json());
  app.use(express.static(__dirname + "/../client/dist"));

  /** Load Routes */
  readdirSync(__dirname + "/api").forEach((file) => {
    let route = require(`./api/${file}`);
    route = new route();
    route.bot = bot;
    route.app = app;
    app[route.method](route.path, route.run.bind(null, bot, app));
  });

  /** 404 */
  app.get("*", (req, res) => {
    res.sendFile(
      require("path").resolve(__dirname + "/../client/dist/index.html")
    );
  });

  app.listen(3000, () => console.log("Started on port 3000"));
}
}
module.exports = Server;