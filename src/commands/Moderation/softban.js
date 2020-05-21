const Settings = require("../../models/configsetting.js");
const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");
const PerGuildLogandWelcome = require("../../models/perguildlogandwelcome.js")
class SB extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "softban",
      description: "Softbans a User from the server",
      usage: "b3softban @user name reason",
      category: "Moderation",
      cooldown: 1000,
      aliases: ["sb"],
      permLevel: 1,
      permission: "BAN_MEMBERS"
    });
  }
async run(message, args) {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const guildTandC = await PerGuildLogandWelcome.findOne({guildID: message.guild.id}) || new PerGuildLogandWelcome({
      guildID: message.guild.id
    })
    const {logChannel} = guildTandC;
    const {enableModeration} = guildSettings;
if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)")
   if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

   let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
   if(!banMember) return message.channel.send("Please provide a user to ban!")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

   banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
   message.guild.ban(banMember, { days: 1, reason: reason})).then(() => message.guild.unban(banMember.id, { reason: "Softban"})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** has been banned`)
             .then(m => m.delete({timeout: 5000}));

    let embed = new MessageEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "ban")
    .addField("Mutee:", banMember.user.username)
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
module.exports = SB;