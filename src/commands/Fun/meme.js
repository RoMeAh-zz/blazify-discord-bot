
const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class MeMe extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "meme",
      description: "Generates a Random MeMe",
      usage: "b3meme",
      category: "Fun",
      cooldown: 1000,
      aliases: ["dankmeme"],
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
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
    }
  }
module.exports = MeMe;