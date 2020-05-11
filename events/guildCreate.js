const { MessageEmbed } = require("discord.js")
module.exports = async (client, guild) => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    const WoW = new MessageEmbed()
    .setTitle("Yahoo, I joined a new guild")
    .setDescription(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
    const channel = client.channels.cache.get("705693639225114661");
    channel.send(WoW)
};
