const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../../Lib/Structures/colours.json");
const PerGuildLogandWelcome = require("../../../Lib/Database/models/perguildlogandwelcome.js")
const Settings = require("../../../Lib/Database/models/configsetting.js");
const BlazifyClient = require("../../../Lib/Base/Command")
class RR extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "removerole",
      description: "Removes a Role from a user",
      usage: "b3rr @user rolename reason",
      category: "Moderation",
      cooldown: 1000,
      aliases: ["rr", "rrole"],
      permLevel: 1,
      permission: "MANAGE_ROLES"
    });
  }
async run(client, message, args) {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const guildTandC = await PerGuildLogandWelcome.findOne({guildID: message.guild.id}) || new PerGuildLogandWelcome({
      guildID: message.guild.id
    })
    const {logChannel} = guildTandC;
    const {enableModeration} = guildSettings;
if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)")
    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

    if (!args[0]) return message.channel.send("You need to mention a user or provide their ID!");
    if (!args[1]) return message.channel.send("You need to provide the role ID or name!");

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("I was unable to find that user!")
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("I was unable to find that role!")
    let reason = args.slice(2).join(" ")
    if(!reason) return message.channel.send("Please provide a reason")

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

    if(!rMember.roles.cache.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, doesnt have the role!`)
    } else {
        await rMember.roles.remove(role.id).catch(e => console.log(e.message))
        message.channel.send(`The role, ${role.name}, has been removed from ${rMember.displayName}.`)
    }

    let embed = new MessageEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Addrole")
    .addField("Mutee:", rMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

    const log = message.guild.channels.cache.get(logChannel.id)
    if(!log) {
      return message.channel.send(embed)
    } else {
      log.send (embed)
    }
}
    }
module.exports = RR;