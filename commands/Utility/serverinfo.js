const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const Settings = require("../../models/configsetting.js");
module.exports = {
        name: "serverinfo",
        description: "Pulls the serverinfo of the guild!",
        usage: "!serverinfo",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["si", "serverdesc"],
    run: async (bot, message, args) => {
 const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableUtility} = guildSettings;
if(!enableUtility) return message.channel.send("Hmm it seems like the Utility commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
    let sEmbed = new MessageEmbed()
        .setColor(cyan)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.size}`, true)
        .setFooter(`TestBot | Footer`, bot.user.displayAvatarURL);
    message.channel.send(sEmbed);
    }
  }
