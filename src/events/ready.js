/** Backend and Web */
const DBL = require("dblapi.js");
const express = require("express");
const http = require("http");
const startServer = require("../../web/backend/server.js");

/** Database */
const Coins = require("../models/coin.js");
const Prefix = require("../models/prefix.js");
const Settings = require("../models/configsetting.js");
const XP = require("../models/xp.js");
const PerGuildLogandWelcome = require("../models/perguildlogandwelcome.js");
const Blacklist = require("../models/blacklist.js");
/** Configuration */ 
const { dbl: dbltoken, WH: webhook, nodes, mode } = require("../config.json");

class Ready {
  constructor(client) {
    this.client = client;
  }
  
 async run(client) {
  await this.client.lava.init(this.client.user.id)
  if (mode !== "development") {
    new startServer(client);

    setInterval(() => dbl.postStats(this.client.guilds.cache.size), 1800000);

    const app = express();
    const server = http.createServer(app);
    const dbl = new DBL(dbltoken, {
      webhookAuth: webhook,
      webhookServer: server,
    });

    dbl.webhook.on("ready", (hook) =>
      console.log(`Webhook running with path ${hook.path}`)
    );
    dbl.webhook.on("vote", (vote) => {
      console.log(`User with ID ${vote.user} just voted!`);
      let votehist = client.guild.channels.cache.get("709685606464225361");
      votehist.send(
        `${vote.user} just voted awesome news. May you get infinite years of good luck`
      );
    });

    app.get("/", (req, res) => void 0);

    server.listen(5000, () => console.log("Listening"));

    this.client.channels.cache
      .get("707274207112724480")
      .edit({ name: `${this.client.guilds.cache.size} Servers` });
    this.client.channels.cache
      .get("707274245423628410")
      .edit({ name: `${this.client.users.cache.size} Members` });
    this.client.channels.cache
      .get("707274279032717313")
      .edit({ name: `${this.client.channels.cache.size} Channels` });
  }

  console.log(
    `Hi, ${this.client.user.username} is now online.
    - Serving ${this.client.guilds.cache.size} Guilds
    - Saying "hi" to ${this.client.users.cache.size} Users
    `
  );

  /* client.music = new ErelaClient(client, nodes)
     .on("nodeError", console.log)
     .on("nodeConnect", () =>
       console.log("Successfully created a new Lavalink Node.")
     )
     .on("queueEnd", (player) => {
       player.textChannel.send("Queue has ended.");
       return client.music.players.destroy(player.guild.id);
     })
     .on("trackStart", ({ textChannel }, { title, duration }) =>
       textChannel
         .send(
           `Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``
       )
         .then((m) => m.delete({ timeout: 15000 }))
     );
*/
  let activities = [
      `${this.client.guilds.cache.size} servers!`,
      `${this.client.channels.cache.size} channels!`,
      `${this.client.users.cache.size} users!`,
    ],
    i = 0;

  setInterval(
    () =>
      this.client.user.setActivity(
        `b3help | ${activities[i++ % activities.length]}`,
        { type: "WATCHING" }
      ),
    15000
  );

  let allGuilds = this.client.guilds.cache.array();
  for (let i = 0; i < allGuilds.length; i++) {
    await Settings.findOne({ guildID: allGuilds[i].id }, async (err, guild) => {
      if (err) console.log(err);

      if (!guild) {
        const newGuild = new Settings({
          guildID: allGuilds[i].id,
          enableXPCoins: false,
          enableXP: false,
          enableCaptcha: false,
          enableVerification: false,
          enableAntiSpam: true,
          enableModeration: true,
          enableFun: true,
          enableGiveaway: true,
          enableEconomy: true,
          enableMusic: true,
          enableGaming: true,
          enableUtility: true,
          enableWelcome: false,
        });
        await newGuild.save().catch((err) => console.log(err));
        console.log(`Added the guild: ${allGuilds[i].id} to the database`);
      }
    });

    await Prefix.findOne({ guildID: allGuilds[i].id }, (err, prefix) => {
      if (err) console.log(err);
      //\\
      if (!prefix) {
        const newPrefix = new Prefix({
          guildID: allGuilds[i].id,
          prefix: "b3",
        });
        newPrefix.save().catch((err) => console.log(err));
        console.log(
          `The guild: '${allGuilds[i].name}' has been added to the prefix database`
        );
      }
    });

    await PerGuildLogandWelcome.findOne(
      { guildID: allGuilds[i].id },
      (err, perguildlogandwelcome) => {
        if (err) console.log(err);

        if (!perguildlogandwelcome) {
          const newPerGuildLogandWelcome = new PerGuildLogandWelcome({
            guildID: allGuilds[i].id,
            logChannel: "logs",
            reportChannel: "reports",
            welcomeChannel: "welcome",
            welcomeMessage:
              "Welcome ${member} to ${member.guild.name}. Don't Dare to leave us please.",
            leaverChannel: "leavers",
            leaverMessage:
              "Bye Bye ${member}. So SAD, we lost one more Member from ${member.guild.name}.",
          });
          newPerGuildLogandWelcome.save().catch((err) => console.log(err));
          console.log(
            `The guild: '${allGuilds[i]}' has been added to the per guild logging, welcoming and leaving database`
          );
        }
      }
    );
  }

  let allUsers = this.client.users.cache.filter(x => !x.client).array();
  
  for (let i = 0; i < allUsers.length; i++) {
    await Blacklist.findOne({ userID: allUsers[i].id }, (err, blacklist) => {
      if (err) console.log(err);
      if (!blacklist) {
        const newBlacklist = new Blacklist({
          userID: allUsers[i].id,
          blacklisted: false,
        });
        newBlacklist.save().catch((err) => console.log(err));
      }
    });
    await Coins.findOne({ userID: allUsers[i].id }, async (err, user) => {
      if (err) console.log(err);

      if (!user) {
        const newCoins = new Coins({
          userName: allUsers[i].username,
          userID: allUsers[i].id,
          coins: 0,
        });

        await newCoins.save().catch((err) => console.log(err));
        console.log(
          `The user: '${allUsers[i]}' has been added to the mongoDB coins database`
        );
      }
    });
  }
  for (let i = 0; i < allUsers.length; i++) {
    for (let g = 0; i < allUsers.length; i++) {
      await XP.findOne(
        {
          userID: allUsers[i].id,
          guildID: allGuilds[g].id,
          userName: allUsers[i].username,
        },
        async (err, user) => {
          if (err) console.log(err);

          if (!user) {
            const newXP = new XP({
              userID: allUsers[i].id,
              guildID: allGuilds[g].id,
              userName: allUsers[i].username,
              xp: 0,
              level: 1,
            });

            await newXP.save().catch((err) => console.log(err));
            console.log(
              `The user: '${allUsers[i]}' has been added to the XP database`
            );
          }
        }
      );
      await XP.findOne(
        {
          userID: allUsers[i].id,
          serverID: allGuilds[g].id,
          userName: allUsers[i].username,
        },
        async (err, user) => {
          if (err) console.log(err);

          if (!user) {
            const newXP = new XP({
              userID: allUsers[i].id,
              serverID: allGuilds[g].id,
              userName: allUsers[i].username,
              money: 0,
            });

            await newXP.save().catch((err) => console.log(err));
            console.log(
              `The user: '${allUsers[i].username}' has been added to the XPCoins database`
            );
          }
        }
      );
    }
  }
};
}
module.exports = Ready;