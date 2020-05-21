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
    redirectUri: "http://localhost:8080/api/callback",
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
    route.client = client;
    route.app = app;
    app[route.method](route.path, route.run.bind(null, client, app));
  });

  /** 404 */
  app.get("*", (req, res) => {
    res.sendFile(
      require("path").resolve(__dirname + "/../client/dist/index.html")
    );
  });

  app.listen(8080, () => console.log("Started on port 8080"));
}
}
module.exports = Server;