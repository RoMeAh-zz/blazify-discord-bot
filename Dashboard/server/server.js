const express = require("express");
const cors = require("cors");
const {json} = require("body-parser");
const {readdirSync} = require("fs");
const {secret} = require("../../config.json");
const Oauth = require("discord-oauth2");
module.exports = async (bot) => {
    const app = express();

    bot.oauth = new Oauth({
        clientSecret: secret,
        clientId: bot.user.id,
        redirectUri: "http://localhost:3000/api/callback"
    });
    bot.oauthURL = bot.oauth.generateAuthUrl({
        scope: ["guilds", "identify"]
    });
    app.use(cors());
    app.use(json());
    app.use(express.static(__dirname + "/../client/dist"));
    readdirSync(__dirname + "/api").forEach((file) => {
        let route = require(`./api/${file}`);
        route = new route();
        route.bot = bot;
        route.app = app;
        app[route.method](route.path, route.run.bind(null, bot, app));
    })
    app.get("*", (req, res) => {
        res.sendFile(require("path").resolve(__dirname + "/../client/dist/index.html"));
    });

    app.listen(3000, () => console.log("Started on port 3000"));
};
