const { MessageEmbed } = require("discord.js");
const Coins = require("../../models/coin.js");
let stealercoins;
let victimcoins;

module.exports = {
  name: "add-money",
  description: "Robs another user",
  usage: "!rpb",
  category: "economy",
  accessableby: "Owner",
  aliases: ["board"],
  run: async (client, message, args) => {

    if (!args[0]) return message.channel.send("You need to specify an amount");

    let user = message.mentions.members.first() || message.author;

    if (isNaN(args[0])) return message.channel.send("That isn't a valid amount");

    let amt = Math.round(args[0]);

    await Coins.findOne({ userID: user.id }, (err, coins) => {

      if (err) console.log(err);

      coins.coins = +coins.coins + +amt
      coins.save().catch(err => console.log(err));

      return message.channel.send(`Gave ${message.mentions.members.first() ? user.user.username : user.username} ${amt} coins.`);
    });
  }
}
