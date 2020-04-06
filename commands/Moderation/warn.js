const Discord = require("discord.js");
const db = require('quick.db');
const config = require("../../config.json");

module.exports = {
        name: "warn",
        description: "Unmutes a member in the discord!",
        usage: "!unmute <user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["killgoysmens"],
  run: async (bot, message, args) => {
    let warnMember = message.guild.member(message.mentions.users.first());
    let reason = args.slice(1).join(' ');
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permissions! You need **KICK_MEMBERS** permission!")
    if (!warnMember) return message.channel.send(`Incorrect usage!\nUsage: ${config.prefix}warn [@user] [reason]`)
    if (!reason) return message.channel.send(`Incorrect usage!\nUsage: ${config.prefix}warn [@user] [reason]`)
    if (warnMember.id === message.author.id) return message.channel.send(`You can't warn yourself. Self-harm is bad 😔`)

    message.guild.member(warnMember).send({
        embed: new Discord.RichEmbed()
            .setColor("RED")
            .addField("Warned!", "You received warning!")
            .addField("Moderator", message.author.tag)
            .addField("Reason", reason)
      
    })

        let embed = new Discord.RichEmbed()
        .setTimestamp()
        .setColor(config.COLOR)
        .setTitle("Action: WARN")
        .addField("Succes Warned", `${warnMember}`)
        .addField("User Id", `${warnMember.id}`)
        .addField("Moderator", `<@${message.author.id}>`)
        .addField("Reason", `${reason}`)
        message.channel.send(`Successfully warned ${warnMember}`)
let sChannel = message.guild.channels.find(c => c.name === "logs")
sChannel.send(embed)
        }
}