const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../../Lib/Structures/colours.json");
const fetch = require('node-fetch');
const Settings = require("../../../Lib/Database/models/configsetting.js");
const BlazifyClient = require("../../../Lib/Base/Command");
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
async run(client, message, args) {
      const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableFun} = guildSettings;
  if(!enableFun) return message.channel.send("Hmm it seems like the Fun commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
      let msg = await message.channel.send("Generating...")

    fetch(`http://aws.random.cat/meow`)
    .then(res => res.json()).then(body => {
        if(!body) return message.reply("whoops! I've broke, try again!")

        let cEmbed = new MessageEmbed()
        .setColor(cyan)
        .setAuthor(`${client.user.username} CATS!`, message.guild.iconURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(client.user.username.toUpperCase(), client.user.displayAvatarURL)

           msg.edit(cEmbed)
        })
    }
}
module.exports = Cat;