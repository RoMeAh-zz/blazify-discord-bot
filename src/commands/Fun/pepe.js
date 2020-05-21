const { MessageEmbed } = require("discord.js")
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class Pepe extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "pepe",
      description: "Generates a Random Emoji of PePe",
      usage: "b3alpaca",
      category: "Fun",
      cooldown: 1000,
      aliases: ["peepeepoopoo", "popo"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(message, args) {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
      guildID: message.guild.id
  });
  const {enableFun} = guildSettings;
if(!enableFun) return message.channel.send("Hmm it seems like the Fun commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)");
     let pepe1 = new MessageEmbed()
    .setColor("f00c0c")
    .setImage("https://cdn.discordapp.com/emojis/428556352915505165.png?v=1");

    let pepe2 = new MessageEmbed()
    .setColor("f00c0c")
    .setImage("https://cdn.discordapp.com/emojis/428556326482739230.png?v=1");

    let pepe3 = new MessageEmbed()
    .setColor("f00c0c")
    .setImage("https://cdn.discordapp.com/emojis/428556486235389973.png?v=1");

    let pepe4 = new MessageEmbed()
    .setColor("f00c0c")
    .setImage("https://cdn.discordapp.com/emojis/428556308929576960.png?v=1");

    let pepe5 = new MessageEmbed()
    .setColor("f00c0c")
    .setImage("https://cdn.discordapp.com/emojis/428556295218659329.png?v=1");

    let pepe6 = new MessageEmbed()
    .setColor("f00c0c")
    .setImage("https://cdn.discordapp.com/emojis/428556467021545473.png?v=1");

    let pepe7 = new MessageEmbed()
    .setColor("f00c0c")
    .setImage("https://cdn.discordapp.com/emojis/428556448507625474.png?v=1");

    let pepe8 = new MessageEmbed()
    .setColor("f00c0c")
    .setImage("https://cdn.discordapp.com/emojis/428556377754042378.png?v=1");

    let pepe9 = new MessageEmbed()
    .setColor("f00c0c")
    .setImage("https://cdn.discordapp.com/emojis/428556281767526405.png?v=1");

    let pepe10 = new MessageEmbed()
    .setColor("f00c0c")
    .setImage("https://cdn.discordapp.com/emojis/428556266366042112.png?v=1");

    let pepes = [pepe1, pepe2, pepe3, pepe4, pepe5, pepe6, pepe7, pepe8, pepe9, pepe10]

    let dapepe = Math.floor((Math.random() * pepes.length));

    message.channel.send(pepes[dapepe])
  }
}
module.exports = Pepe;