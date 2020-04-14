const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const fetch = require("node-fetch");

module.exports = {
    name: "vote",
    aliases: [""],
    category: "Utility",
    description: "Vote for the bot",
    usage: "!vote",
    run: async (client, message, args) => {
      const voteEmbed = new RichEmbed()
        .setTitle("Vote for the bot")
        .addField(
          "Vote link",
         "1. GlenbotList: https://glennbotlist.xyz/bot/690934802940952586/vote"
        )
        .setColor("#FF0000");
      message.channel.send(voteEmbed);
    }
}