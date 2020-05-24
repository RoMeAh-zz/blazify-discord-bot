const { MessageEmbed } = require("discord.js");
class guildDelete {
  constructor(guild) {
    this.guild = guild;
  }
  
 async run(client, guild) {  // this event triggers when the client is removed from a guild.
  console.log(`I have been removed from: ${this.guild.name} (id: ${this.guild.id})`);
  const WoW = new MessageEmbed()
    .setTitle("Sad, I have been kicked from a  guild")
    .setDescription(
      `I have been removed from: ${this.guild.name} (id: ${this.guild.id})`
    );
  const channel = this.client.channels.cache.get("705693642706255924");
  channel.send(WoW);
};
}
module.exports = guildDelete;