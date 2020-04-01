const { Client, Collection, Attachment, RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://SecondRomeah:itc12345@mongodbxpcoinsystem-cjqmq.mongodb.net/test?retryWrites=true&w=majority/XPCoins",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch(err => console.log(err));
const Money = require("./models/money.js");


const client = new Client({
  disableEveryone: true
});
const PREFIX = "b3";
const cheerio = require("cheerio");

const request = require("request");

// Collections

client.commands = new Collection();
client.aliases = new Collection();


// Run the command loader
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
  console.log(
    `Hi, ${client.user.username} is now online on ${client.guilds.size} Guilds with ${client.users.size} Members`
  );

  let activities = [
      `${client.guilds.size} servers!`,
      `${client.channels.size} channels!`,
      `${client.users.size} users!`
    ],
    i = 0;
  setInterval(
    () =>
      client.user.setActivity(
        `${PREFIX}help | ${activities[i++ % activities.length]}`,
        { type: "WATCHING" }
      ),
    5000
  );

  client.channels
    .get("693785937880285204")
    .edit({ name: `${client.guilds.size} Guilds` });
  client.channels
    .get("693786407600128120")
    .edit({ name: `${client.users.size} Members` });
  client.channels
    .get("694413926993100830")
    .edit({ name: `${client.channels.size} Channels` });
});

client.on("message", async message => {
  const prefix = "b3";

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) command.run(client, message, args);
});

client.on("message", message => {
  if (message.author.bot) return;
  let coinstoadd = Math.ceil(Math.random() * 5) + 5;
  console.log(coinstoadd + "coins");
  Money.findOne(
    { userID: message.author.id, serverID: message.guild.id },
    (err, money) => {
      if (err) console.log(err);
      if (!money) {
        const newMoney = new Money({
          userID: message.author.id,
          serverID: message.guild.id,
          money: coinstoadd
        });
        newMoney.save().catch(err => console.log(err));
      } else {
        money.money = money.money + coinstoadd;
        money.save().catch(err => console.log(err));
        if (money.money > 999) {
          let role = message.guild.roles.find(r => r.name === "Freshers");
          message.member.addRole(role);
        }
        if (money.money > 4999) {
          let role = message.guild.roles.find(r => r.name === "Newbie");
          message.member.addRole(role);
        }
        if (money.money > 9999) {
          let role = message.guild.roles.find(
            r => r.name === "Descent Active Chatters"
          );
          message.member.addRole(role);
        }
        if (money.money > 19999) {
          let role = message.guild.roles.find(
            r => r.name === "Active Chatters"
          );
          message.member.addRole(role);
        }
        if (money.money > 29999) {
          let role = message.guild.roles.find(
            r => r.name === "Very Active Chatters"
          );
          message.member.addRole(role);
        }
        if (money.money > 49999) {
          let role = message.guild.roles.find(r => r.name === "OP Chatters");
          message.member.addRole(role);
        }
      }
    }
  );
});

client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.find(
    channel => channel.name === "welcome"
  );
  if (!channel) return;
  channel.send(`Welcome to the Blaze 3 Official Server ${member}`);
});

client.on("guildmemberRemove", member => {
  const channel = member.guild.channels.find(
    channel => channel.name === "leavers"
  );
  if (!channel) return;
  channel.send(`What a bad user he was, he left ou server, ${member}`);
});

client.on("message", message => {
  let args = message.content.substring(PREFIX.length).split(" ");
  switch (args[0]) {
    case "help":
      const helpEmbed = new RichEmbed()
        .setThumbnail(client.user.avatarURL)
        .setTitle("Commands of our Official Bot", true)
        .addField("Moderation", "kick, ban, mute, report, unban, unmute, softban, addrole, removerole", true)
        .addField("Fun", "xpcoins, meme, gglimgn, love, rps, cat, dog", true)
        .addField("Gaming", "apex, fortnite, overwatch, rainbow6")
        .addField("Utility", "help, ping, say, whois, serverinfo, instagram, prefix", true)
        .setColor("#FF0000")
        .addField('Music', "play, pause, resume, nowplaying, queue, skip, forceskip, remove, shuffle, volume, stop, forcestop", true)
        .setAuthor("Blaze 3 Bot - The Ultimate All in One" )
        .addField("Bot Owner Only", "eval, reload, shutdown")
        .addField("Others",`[Support Server](https://discord.gg/3JrdUxt) |  [Invite to your server](https://discordapp.com/oauth2/authorize?client_id=690934802940952586&scope=bot&permissions=2146958847) |  [Vote the Bot](https://glennbotlist.xyz/bot/690934802940952586/vote) | [Donate](https://www.paypal.me/roahgaming)`, true)
        .setFooter("Make sure to use the prefix before these commands. PREFIX IS 'b3'");
       message.channel.send(helpEmbed);
      break;
  }
});

client.on("message", message => {
  let args = message.content.substring(PREFIX.length).split(" ");
  switch (args[0]) {
    case "support":
      const supportEmbed = new RichEmbed()
        .setTitle("Support")
        .addField("Support Server", "https://discord.gg/3JrdUxt")
        .setColor("#FF0000");
      message.channel.send(supportEmbed);
  }
});
client.on("message", message => {
  let args = message.content.substring(PREFIX.length).split(" ");
  switch (args[0]) {
    case "invite":
      const inviteEmbed = new RichEmbed()
        .setTitle("Invite the bot")
        .addField(
          "Invite link",
          "https://discordapp.com/oauth2/authorize?client_id=690934802940952586&scope=bot&permissions=2146958847"
        )
        .setColor("#FF0000");
      message.channel.send(inviteEmbed);
  }
});
client.on("message", message => {
  let args = message.content.substring(PREFIX.length).split(" ");
  switch (args[0]) {
    case "vote":
      const voteEmbed = new RichEmbed()
        .setTitle("Vote the bot")
        .addField(
          "Vote link",
          "1> GlenbotList: https://glennbotlist.xyz/bot/690934802940952586/vote"
        )
        .setColor("#FF0000");
      message.channel.send(voteEmbed);
  }
});
client.on("message", message => {
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

client.login("NjkwOTM0ODAyOTQwOTUyNTg2.XoSuhg.Ym20upWFRFTonZJS4j-LB5Z-5Z4");
