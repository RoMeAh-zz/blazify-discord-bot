const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class Cat extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "cat",
      description: "Generates a Random Picture of a Cat",
      usage: "b3cat",
      category: "Fun",
      cooldown: 1000,
      aliases: ["catto"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(message, args) {
      const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableFun} = guildSettings;
  if(!enableFun) return message.channel.send("Hmm it seems like the Fun commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
        g = await message.channel.send("Generating...")

    fetch(`http://aws.random.cat/meow`)
    .then(res => res.json()).then(body => {
        if(!body) return message.reply("whoops! I've broke, try again!")

        let cEmbed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${bot.user.username} CATS!`, message.guild.iconURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

            message.channel.send(cEmbed)
        })
    }
}
module.exports = Cat;