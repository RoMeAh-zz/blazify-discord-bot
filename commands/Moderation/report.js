    const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const lgc = require("../../config.json").reportChannel;
const Settings = require("../../models/configsetting.js");
module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention, id>",
    run: async (client, message, args) => {
        const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
            guildID: message.guild.id
        });
        const {enableModeration} = guildSettings;
    if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
              if (message.deletable) message.delete();

              let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

              if (!rMember)
                  return message.reply("Couldn't find that person?").then(m => m.delete(5000));

              if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
                  return message.channel.send("Can't report that member").then(m => m.delete(5000));

              if (!args[1])
                  return message.channel.send("Please provide a reason for the report").then(m => m.delete(5000));


              if (!channel)
                  return message.channel.send("Couldn't find a `#reports` channel").then(m => m.delete(5000));

              const embed = new MessageEmbed()
                  .setColor("#ff0000")
                  .setTimestamp()
                  .setFooter(message.guild.name, message.guild.iconURL)
                  .setAuthor("Reported member", rMember.user.displayAvatarURL)
                  .setDescription(stripIndents`**> Member:** ${rMember} (${rMember.user.id})
            **> Reported by:** ${message.member}
            **> Reported in:** ${message.channel}
            **> Reason:** ${args.slice(1).join(" ")}`);
              let lChannel = message.guild.channels.cache.find(channel => channel.name === "reports")
              lChannel.send(embed)
          }
      }
  

