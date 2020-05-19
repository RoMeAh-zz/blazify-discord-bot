const { MessageEmbed } = require("discord.js");
const Settings = require("../models/configsetting.js");
const Prefix = require("../models/prefix.js");
const PerGuildLogandWelcome = require("../models/perguildlogandwelcome.js");
class guildCreate {
  constructor(client) {
    this.client = client;
  }
 async run(client, guild) {   // This event triggers when the bot joins a guild.
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  const WoW = new MessageEmbed()
    .setTitle("Yahoo, I joined a new guild")
    .setDescription(
      `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
    );
  const channel = client.channels.cache.get("705693639225114661");
  channel.send(WoW);

  await Settings.findOne({ guildID: guild.id }, async (err, guild) => {
    if (err) console.log(err);

    if (!guild) {
      const newGuild = new Settings({
        guildID: guild.id,
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
      console.log(`Added the guild: ${guild} to the database`);
    }
  });

  await Prefix.findOne({ guildID: guild.id }, (err, prefix) => {
    if (err) console.log(err);

    if (!prefix) {
      const newPrefix = new Prefix({
        guildID: guild.id,
        prefix: "b3",
      });
      newPrefix.save().catch((err) => console.log(err));
      console.log(
        `The guild: '${guild}' has been added to the prefix database`
      );
    }
  });
  await PerGuildLogandWelcome.findOne(
    { guildID: guild.id },
    (err, perguildlogandwelcome) => {
      if (err) console.log(err);

      if (!perguildlogandwelcome) {
        const newPerGuildLogandWelcome = new PerGuildLogandWelcome({
          guildID: guild.id,
          logChannel: "logs",
          reportChannel: "reports",
          welcomeChannel: "welcome",
          welcomeMessage:
            "Welcome ${member} to the Server. Don't Dare to leave us please.",
          leaverChannel: "leavers",
          leaverMessage:
            "Bye Bye ${member.id}. So SAD, we lost one more Member.",
        });
        newPerGuildLogandWelcome.save().catch((err) => console.log(err));
        console.log(
          `The guild: '${guild}' has been added to the per guild logging, welcoming and leaving database`
        );
      }
    }
  );
};
}
module.exports = guildCreate;