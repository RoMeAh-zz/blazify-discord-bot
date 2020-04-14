const { RichEmbed } = require("discord.js")
module.exports = async ( guild ) => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    const WoW = new RichEmbed()
    .setTitle("Yahoo, I joined a new guild")
    .setDescription(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
    const channel = guild.channel.cache.some(channel => channel.id === "699209481460121670");
    channel.send(WoW)
    client.user.setActivity(`Moderating ${client.guilds.cache.size} servers with ${client.guild.memberCount} members!`);

};
