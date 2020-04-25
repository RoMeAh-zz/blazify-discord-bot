const { MessageEmbed } = require("discord.js");
const { redlight } = require("../../colours.json");
const Coins = require("../../models/coin.js");
const mongoose = require("mongoose");

module.exports = {
  name: "balance",
  aliases: ["bal", "b"],
  category: "economy",
  description: "Checks the balance of a user",
  usage: "!balance",
  run: async (client, message, args) => {
    let allGuilds = client.guilds.cache.array();
    for (let i = 0; i < allGuilds.length; i++) {
    Settings.findOne(
      { guildID: allGuilds[i].id },
      async (err, settings) => {
        if (err) console.log(err);

        if (!settings) {
          enableEconomy = false;
        } else {
          enableEconomy = settings.enableEconomy
        }
      })
    }
    if(enableEconomy === true) {
    if (args[0]) {
      let member = message.mentions.members.first();

      if (member.user.bot)
        return message.channel.send("You can't check the balance of a bot");

      await Coins.findOne({ userID: member.user.id }, (err, coins) => {
        if (err) console.log(err);

        if (!coins) {
          const newCoins = new Coins({
            userName: message.author.username,
            userID: message.author.id,
            coins: 0
          });
          console.log("??");
          newCoins.save().catch(err => console.log(err));
        }

        let balance = coins.coins;

        let bal = new MessageEmbed()
          .setTitle(`${member.user.username}'s Money`)
          .setColor('#ed0e0e')
          .addField("Money", balance);

        message.channel.send(bal);
      });
    } else {
      await Coins.findOne({ userID: message.author.id }, (err, coins) => {
        if (err) console.log(err);

        if (!coins) {
          const newCoins = new Coins({
            userName: message.author.username,
            userID: message.author.id,
            coins: 0
          });
          console.log("??");
          newCoins.save().catch(err => console.log(err));
        }

        let balance = coins.coins;

        let bal = new MessageEmbed()
          .setTitle(`${message.author.username}'s Money`)
          .setColor('#ed0e0e')
          .addField("Money", balance);

        message.channel.send(bal);
      });
    }
  }
  }
};
