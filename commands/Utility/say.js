const { RichEmbed } = require("discord.js");
const Settings = require("../../models/configsetting.js");
module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
    description: "Says your input via the bot",
    usage: "<input>",
    run: async (client, message, args) => {
        const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
            guildID: message.guild.id
        });
        const {enableUtility} = guildSettings;
    if(!enableUtility) return message.channel.send("Hmm it seems like the Utility commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
              message.delete();

              if (!message.member.hasPermission("MANAGE_MESSAGES"))
                  return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

              if (args.length < 0)
                  return message.reply("Nothing to say?").then(m => m.delete(5000));

              const roleColor = message.guild.me.highestRole.hexColor;

              if (args[0].toLowerCase() === "embed") {
                  const embed = new MessageEmbed()
                      .setDescription(args.slice(1).join(" "))
                      .setColor(roleColor === "#000000" ? "#ffffff" : roleColor);

                  message.channel.send(embed);
              } else {
                  message.channel.send(args.join(" "));
              }
          }
      }

