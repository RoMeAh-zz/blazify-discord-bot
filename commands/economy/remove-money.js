const { MessageEmbed } = require("discord.js");
const Coins = require("../../models/coin.js");
let stealercoins;
let victimcoins;

module.exports = {
  name: "remove-money",
  description: "Robs another user",
  usage: "!rpb",
  category: "economy",
  accessableby: "Owner",
  aliases: ["board"],
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send("You need to specify an amount");

    let user = message.mentions.members.first() || message.author;

    await Coins.findOne({ userID: user.id }, (err, coins) => {
      if (err) console.log(err);

      if (isNaN(args[0])) {
        if (args[0] === "all") {
          args[0] = Math.round(coins.coins);
        } else if (args[0] === "half") {
          args[0] = Math.round(coins.coins / 2);
        } else {
          return message.channel.send("That isn't a valid amount");
        }
      }

      console.log(args[0]);

      if (coins.coins < Math.round(args[0]))
        return message.channel.send(
          "You can't remove more coins than what that person has"
        );
      let amt = Math.round(args[0]);

      coins.coins = coins.coins - amt;
      coins.save().catch(err => console.log(err));

      return message.channel.send(
        `Removed ${amt} coins from ${
          message.mentions.members.first() ? user.user.username : user.username
        }`
      );
    });
  }
};
