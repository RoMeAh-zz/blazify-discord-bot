const { Client, Collection, Attachment, RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var version = "v3";
const mongoose = require("mongoose");
const { getImage } = require("./functions.js");
const Money = require("./models/money.js");
const Coins = require("./models/coin.js");

const client = new Client({
  disableEveryone: true
});

client.mongoose = require("./utils/mongoose.js"); //leave this its for mongoose/mongodb
client.afk = new Map();

const PREFIX = "b3";
const cheerio = require("cheerio");

const request = require("request");

// Collections

["commands", "aliases"].forEach(x => (client[x] = new Collection()));
// Requires Manager from discord-giveaways

// Run the command and event loader
["command", "event"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

let y = process.openStdin()
y.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
    client.channels.get("696786895933538435").send(x.join(" "));
});

client.on("message", message => {
  if (!message.content.startsWith("b3")) return;
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "gglimgn":
      image(message);

      break;
  }
});

function image(message) {
  var options = {
    url: "http://results.dogpile.com/serp?qc=images&q=" + "gaming",

    method: "GET",

    headers: {
      Accept: "text/html",

      "User-Agent": "Chrome"
    }
  };

  request(options, function(error, response, responseBody) {
    if (error) {
      return;
    }

    $ = cheerio.load(responseBody);

    var links = $(".image a.link");

    var urls = new Array(links.length)
      .fill(0)
      .map((v, i) => links.eq(i).attr("href"));

    console.log(urls);

    if (!urls.length) {
      return;
    }

    // Send result

    message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
  });
}





client.mongoose.init();
client.login('NjkwOTM0ODAyOTQwOTUyNTg2.XonKmw.WiIOkw7b5hnWx_B6s1ecvLLaTXY');
