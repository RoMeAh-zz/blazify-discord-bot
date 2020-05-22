const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");
const PerGuildLogandWelcome = require("../../models/perguildlogandwelcome.js")
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command")
class UNMute extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "unmute",
      description: "Unmutes a User from the server",
      usage: "b3unmute @user name reason",
      category: "Moderation",
      cooldown: 1000,
      aliases: ["um"],
      permLevel: 1,
      permission: "MANAGE_MEMBERS"
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
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

//define the reason and unmutee
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("Please supply a user to be muted!");

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given"

//define mute role and if the mute role doesnt exist then send a message
let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) return message.channel.send("There is no mute role to remove!")

//remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
mutee.removeRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} was unmuted!`)
})

//send an embed to the modlogs channel
let embed = new MessageEmbed()
.setColor(redlight)
.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
.addField("Moderation:", "unmute")
.addField("Mutee:", mutee.user.username)
.addField("Moderator:", message.author.username)
.addField("Reason:", reason)
.addField("Date:", message.createdAt.toLocaleString())

const log = message.guild.channels.get(logChannel.id)
if(!log) {
  return message.channel.send(embed)
} else {
  log.send (embed)
}
    }
  }
module.exports = UNMute;