const { RichEmbed } = require("discord.js")
module.exports = async ( guild, member ) => {
 // this event triggers when the bot is removed from a guild.
 console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
 const WoW = new RichEmbed()
    .setTitle("Sad, I have been kicked from a  guild")
    .setDescription(`I have been removed from: ${guild.name} (id: ${guild.id})`)
    const channel = member.guild.channels.find(channel => channel.id === "699209670874628157");
    channel.send(WoW)
 client.user.setActivity(`Moderating ${client.guilds.size} servers with ${client.guild.memberCount}`);
}