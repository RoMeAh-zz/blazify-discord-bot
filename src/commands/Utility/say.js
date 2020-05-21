const { RichEmbed } = require("discord.js");
const Settings = require("../../models/configsetting.js");
class Say extends BlazifyClient {
    constructor(client) {
      super(client, {
        name: "say",
        description: "Says a message given by the user",
        usage: "b3say cheeeseeeeee",
        category: "Utility",
        cooldown: 1000,
        aliases: ["brodcast"],
        permLevel: 1,
        permission: "MANAGE_MESSAGES"
      });
    }
  async run(message, args) {
        const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
            guildID: message.guild.id
        });
        const {enableUtility} = guildSettings;
    if(!enableUtility) return message.channel.send("Hmm it seems like the Utility commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)");
              message.delete();

              if (!message.member.hasPermission("MANAGE_MESSAGES"))
                  return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

              if (args.length < 0)
                  return message.reply("Nothing to say?").then(m => m.delete({timeout: 5000}));



              if (args[0].toLowerCase() === "embed") {
                  const embed = new MessageEmbed()
                      .setDescription(args.slice(1).join(" "))
                      .setColor("#000")

                  message.channel.send(embed);
              } else {
                  message.channel.send(args.join(" "));
              }
          }
      }
module.exports = Say;