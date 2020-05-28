const { MessageEmbed } = require("discord.js");
const Settings = require("../../../Lib/Database/models/configsetting.js");
const Prefix = require("../../../Lib/Database/models/prefix.js");
const PerGuildLogandWelcome = require("../../../Lib/Database/models/perguildlogandwelcome.js");
class guildCreate {
  constructor(guild) {
    this.guild = guild;
  }
 async run(client, guild) {   // This event triggers when the client joins a guild.
  console.log(
    `New guild joined: ${this.guild.name} (id: ${this.guild.id}). This guild has ${this.guild.memberCount} members!`
  );
  const WoW = new MessageEmbed()
    .setTitle("Yahoo, I joined a new guild")
    .setDescription(
      `New guild joined: ${this.guild.name} (id: ${this.guild.id}). This guild has ${this.guild.memberCount} members!`
    );
  const channel = client.channels.cache.get("715462262499967026");
  channel.send(WoW);

  await Settings.findOne({ guildID: this.guild.id }, async (err, guild) => {
    if (err) console.log(err);

    if (!guild) {
      const newGuild = new Settings({
        guildID: this.guild.id,
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
      console.log(`Added the guild: ${this.guild} to the database`);
    }
  });

  await Prefix.findOne({ guildID: this.guild.id }, (err, prefix) => {
    if (err) console.log(err);

    if (!prefix) {
      const newPrefix = new Prefix({
        guildID: this.guild.id,
        prefix: "b3",
      });
      newPrefix.save().catch((err) => console.log(err));
      console.log(
        `The guild: '${this.guild}' has been added to the prefix database`
      );
    }
  });
  await PerGuildLogandWelcome.findOne(
    { guildID: this.guild.id },
    (err, perguildlogandwelcome) => {
      if (err) console.log(err);

      if (!perguildlogandwelcome) {
        const newPerGuildLogandWelcome = new PerGuildLogandWelcome({
          guildID: this.guild.id,
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
          `The guild: '${this.guild}' has been added to the per guild logging, welcoming and leaving database`
        );
      }
    }
  );
};
}
module.exports = guildCreate;