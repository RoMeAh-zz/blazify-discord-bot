const Settings = require("../../models/configsetting.js");
const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");
const lgc = require("../../config.json").logChannel;
module.exports = {
        name: "softban",
        description: "Softbans a user from the guild!",
        usage: "!softban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["sb", "sbanish", "sremove"],
    run: async (bot, message, args) => {
      let allGuilds = client.guilds.cache.array();
      for (let i = 0; i < allGuilds.length; i++) {
      Settings.findOne(
        { guildID: allGuilds[i].id },
        async (err, settings) => {
          if (err) console.log(err);

          if (!settings) {
            enableModeration = false;
          } else {
            enableModeration = settings.enableModeration
          }
        })
      }
      if(enableModeration === true) {
   if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

   let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
   if(!banMember) return message.channel.send("Please provide a user to ban!")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

   banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
   message.guild.ban(banMember, { days: 1, reason: reason})).then(() => message.guild.unban(banMember.id, { reason: "Softban"})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000))

    let embed = new MessageEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "ban")
    .addField("Mutee:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    let lChannel = message.guild.channels.cache.find(channel => channel.name === "logs")
    lChannel.send(embed)
}
}
}
