const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class SI extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "serverinfo",
      description: "Shows information about the server",
      usage: "b3serverinfo",
      category: "Utility",
      cooldown: 1000,
      aliases: ["si"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(message, args) {
 const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableUtility} = guildSettings;
if(!enableUtility) return message.channel.send("Hmm it seems like the Utility commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)");
    let sEmbed = new MessageEmbed()
        .setColor(cyan)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.cache.size}`, true)
        .setFooter(`Blazify | Footer`, bot.user.displayAvatarURL);
    message.channel.send(sEmbed);
    }
  }
module.exports = SI;