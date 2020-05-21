    const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const PerGuildLogandWelcome = require("../../models/perguildlogandwelcome.js")
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command")
class Report extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "report",
      description: "Reports a user in a Server",
      usage: "b3report @user reason",
      category: "Moderation",
      cooldown: 1000,
      aliases: ["rip"],
      permLevel: 1,
      permission: "SEND_MESSAGES"
    });
  }
async run(message, args) {
        const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
            guildID: message.guild.id
        });
        const guildTandC = await PerGuildLogandWelcome.findOne({guildID: message.guild.id}) || new PerGuildLogandWelcome({
          guildID: message.guild.id
        })
        const {reportChannel} = guildTandC;
        const {enableModeration} = guildSettings;
    if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
              if (message.deletable) message.delete();

              let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

              if (!rMember)
                  return message.reply("Couldn't find that person?")
                            .then(m => m.delete({timeout: 5000}));;

              if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
                  return message.channel.send("Can't report that member")
                            .then(m => m.delete({timeout: 5000}));;

              if (!args[1])
                  return message.channel.send("Please provide a reason for the report")
                   .then(m => m.delete({timeout: 5000}));;



              const embed = new MessageEmbed()
                  .setColor("#ff0000")
                  .setTimestamp()
                  .setFooter(message.guild.name, message.guild.iconURL)
                  .setAuthor("Reported member", rMember.user.displayAvatarURL)
                  .setDescription(stripIndents`**> Member:** ${rMember} (${rMember.user.id})
            **> Reported by:** ${message.member}
            **> Reported in:** ${message.channel}
            **> Reason:** ${args.slice(1).join(" ")}`);
            const log = message.guild.channels.get(reportChannel.id)
            if(!log) {
              return message.channel.send(embed)
            } else {
              log.send (embed)
            }
          }
      }
module.exports = Report;