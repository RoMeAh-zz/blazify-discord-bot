const { MessageEmbed } = require("discord.js");
const { getMember } = require("../../utils/functions.js");
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class Love extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "love",
      description: "Generates a Random Graph of Love",
      usage: "b3love @Pro",
      category: "Fun",
      cooldown: 1000,
      aliases: ["lv"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(message, args) {
    const guildSettings =
      (await Settings.findOne({ guildID: message.guild.id })) ||
      new Settings({
        guildID: message.guild.id,
      });
    const { enableFun } = guildSettings;
    if (!enableFun)
      return message.channel.send(
        "Hmm it seems like the Fun commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)"
      );
    // Get a member from mention, id, or username
    let person = getMember(message, args[0]);

    if (!person || message.author.id === person.id) {
      person = message.guild.members.cache
        .filter((m) => m.id !== message.author.id)
        .random();
    }

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

    const embed = new MessageEmbed()
      .setColor("#ffb6c1")
      .addField(
        `☁ **${person.displayName}** loves **${message.member.displayName}** this much:`,
        `💟 ${Math.floor(love)}%\n\n${loveLevel}`
      );

    message.channel.send(embed);
  }
};
module.exports = Love;
