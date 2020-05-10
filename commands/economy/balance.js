const { MessageEmbed } = require("discord.js");
const { redlight } = require("../../colours.json");
const Settings = require("../../models/configsetting.js");
const Coins = require("../../models/coin.js");
const mongoose = require("mongoose");

module.exports = {
  name: "balance",
  aliases: ["bal", "b"],
  category: "economy",
  description: "Checks the balance of a user",
  usage: "!balance",
  run: async (client, message, args) => {
     const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableEconomy} = guildSettings;
if(!enableEconomy) return message.channel.send("Hmm it seems like the Economy commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
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
  
};
