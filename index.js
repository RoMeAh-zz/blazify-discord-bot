const { Client, Collection } = require("discord.js");
const TOKEN = require("./config.json").token;
const mongoose = require("mongoose");
const client = new Client
client.mongoose = require("./utils/mongoose.js");
client.afk = new Map();
["commands", "aliases"].forEach(x => (client[x] = new Collection()));
["command", "event"].forEach(handler => {require(`./handlers/${handler}`)(client);});
client.mongoose.init();
client.login(TOKEN);
