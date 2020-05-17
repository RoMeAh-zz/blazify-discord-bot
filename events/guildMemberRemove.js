const PerGuildLogandWelcome = require("../models/perguildlogandwelcome.js");
const Settings = require("../models/configsetting.js");

module.exports = async (client, member) => {
  const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
    guildID: message.guild.id
});
  const guildTandC = await PerGuildLogandWelcome.findOne({guildID: message.guild.id}) || new PerGuildLogandWelcome({
    guildID: message.guild.id
  })
const {enableWelcome} = guildSettings;
const {leaverChannel, leaverMessage} = guildTandC;
if(enableWelcome) {
  const channel = member.guild.channels.cache.get(leaverChannel.id);
  if (!channel) return;
  channel.send(`${leaverMessage}`);
}
}
