const { MessageEmbed } = require("discord.js");
class guildDelete {
  constructor(client) {
    this.client = client;
  }
  
 async run(client, guild) {  // this event triggers when the client is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  const WoW = new MessageEmbed()
    .setTitle("Sad, I have been kicked from a  guild")
    .setDescription(
      `I have been removed from: ${guild.name} (id: ${guild.id})`
    );
  const channel = client.channels.cache.get("705693642706255924");
  channel.send(WoW);
};
}
module.exports = guildDelete;