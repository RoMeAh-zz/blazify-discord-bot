const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");
const PerGuildLogandWelcome = require("../../models/perguildlogandwelcome.js")
const Settings = require("../../models/configsetting.js");
class Unban extends BlazifyClient {
    constructor(client) {
      super(client, {
        name: "unban",
        description: "Unbans a User from the server",
        usage: "b3unban @user name reason",
        category: "Moderation",
        cooldown: 1000,
        aliases: ["ub"],
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
if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)");
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")


	if(!(args[0])) return message.channel.send("You need to provide an ID.")
    let bannedMember = await bot.fetchUser(args[0])
        if(!bannedMember) return message.channel.send("Please provide a user id to unban someone!")

    let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command!")|
    message.delete()
    try {
        message.guild.unban(bannedMember, reason)
        message.channel.send(`${bannedMember.tag} has been unbanned from the guild!`)
    } catch(e) {
        console.log(e.message)
    }

    let embed = new MessageEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "unban")
    .addField("Moderated on:", `${bannedMember.username} (${bannedMember.id})`)
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
module.exports = Unban;