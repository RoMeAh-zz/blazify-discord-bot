const PerGuildLogandWelcome = require("../models/perguildlogandwelcome.js");
const Settings = require("../models/configsetting.js");

module.exports = async (client, member) => {
  const guildSettings =
    (await Settings.findOne({ guildID: member.guild.id })) ||
    new Settings({
      guildID: member.guild.id,
    });

  const guildTandC =
    (await PerGuildLogandWelcome.findOne({ guildID: member.guild.id })) ||
    new PerGuildLogandWelcome({
      guildID: member.guild.id,
    });

  const { enableWelcome } = guildSettings;
  const { leaverChannel, leaverMessage } = guildTandC;

  if (enableWelcome) {
    const channel = member.guild.channels.cache.get(leaverChannel.id);
    if (!channel) return;
    channel.send(`${leaverMessage}`);
  }
};
