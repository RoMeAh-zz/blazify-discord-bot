const { Client, Collection, Attachment, RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const TOKEN = require("./config.json")
const fs = require("fs");
const ms = require("ms");
const mongoose = require("mongoose");

const client = new Client({
  disableEveryone: true
});
client.mongoose = require("./utils/mongoose.js");
client.afk = new Map();
const PREFIX = "b3";
const cheerio = require("cheerio");
const request = require("request");

["commands", "aliases"].forEach(x => (client[x] = new Collection()));
["command", "event"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

let y = process.openStdin()
y.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
    client.channels.get("696786895933538435").send(x.join(" "));
});

client.mongoose.init();
client.login(TOKEN);
