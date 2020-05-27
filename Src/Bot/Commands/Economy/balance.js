const { MessageEmbed } = require("discord.js");
const { redlight } = require("../../../Lib/Structures/colours.json");
const Settings = require("../../../Lib/Database/models/configsetting.js");
const Coins = require("../../../Lib/Database/models/coin.js");
const mongoose = require("mongoose");
const BlazifyClient = require("../../../Lib/Base/Command");
class Balance extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "balance",
      description: "Shows the Economy Balance of a user",
      usage: "b3balance",
      category: "economy",
      cooldown: 1000,
      aliases: ["bal"],
      permLevel: 1,
      permission: "READ-MESSAGES"
    });
  }
async run(client, message, args) {
     const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableEconomy} = guildSettings;
if(!enableEconomy) return message.channel.send("Hmm it seems like the Economy commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
    if (args[0]) {
      let member = message.mentions.members.first();

      if (member.user.client)
        return message.channel.send("You can't check the balance of a client");

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

        let balance = coins.coins
        if(!balance) return message.channel.send("Sed you do not have any money")

        let bal = new MessageEmbed()
          .setTitle(`${message.author.username}'s Money`)
          .setColor('#ed0e0e')
          .addField("Money", balance);

        message.channel.send(bal);
      });
    }
  }
};
module.exports = Balance;