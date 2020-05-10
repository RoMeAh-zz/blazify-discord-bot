const Coins = require("../../models/coin.js");
const { RichEmbed } = require("discord.js");
const mongoose = require('mongoose');
const Settings = require("../../models/configsetting.js");
module.exports = {
  name: "bet",
  description: "Bets some money",
  usage: "!bet <amt>",
  category: "economy",
  accessableby: "Members",
  aliases: ["gamble"],
  run: async (client, message, args) => {
     const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableEconomy} = guildSettings;
if(!enableEconomy) return message.channel.send("Hmm it seems like the Economy commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)");
    let embed = new MessageEmbed()
    .setTitle(`${message.author.username}'s Gambling Match`)
    .setFooter(`${message.author.username}'s Gambling results`, message.author.displayAvatarURL)

    let chance = Math.random();
    let bet = args[0];

    if (!bet) return message.channel.send("You need to bet a valid amount of coins");

    await Coins.findOne({ userID: message.author.id }, (err, user) => {

      if (err) console.log(err);

      if (!user) {
        const newCoins = new Coins({
          userName: message.author.username,
          userID: message.author.id,
          coins: 0
        })
        newCoins.save().catch(err => console.log(err));
      };

      if (user.coins === 0) return message.channel.send("You don't have enough coins to bet coins!");
      if (bet > user.coins) return message.channel.send("You can't bet more than what you have!");

      if (isNaN(bet)) {
        if (bet === "half") {
          bet = Math.round(user.coins / 2);
        } else if (bet === "all") {
          bet = Math.round(user.coins);
        } else {
          return message.channel.send("Your bet has to be a number")
        };
      }

      if (bet < 1 || !Number.isInteger(Number(bet))) return message.channel.send("You can't bet nothing");

      if (chance > 0.90) {
        let winBy = Math.random() + 1;
        let ran = Math.round(Math.random());

        winBy = winBy + ran;
        let winnings = Math.round(bet * winBy);

        user.coins = user.coins + winnings;
        user.save().catch(err => console.log(err));
        embed.setDescription(`You won ${winnings} coins. You won the bet by ${Math.round(winBy * 100)}%\n\n
        You now have ${user.coins} coins.`)
        embed.setColor('GREEN');
      } else if (chance > 0.50) {
        let winBy = Math.random() + 0.5;
        let winnings = Math.round(bet * winBy);

        user.coins = +user.coins + +winnings;
        user.save().catch(err => console.log(err));
        embed.setDescription(`You won ${winnings} coins. You won the bet by ${Math.round(winBy * 100)}%\n\n
        You now have ${user.coins} coins.`);
        embed.setColor('GREEN');
      } else {
        user.coins = user.coins - bet;
        user.save().catch(err => console.log(err));
        embed.setDescription(`You gambled ${bet} coins, and you lost ${Number(bet).toLocaleString()} coins.\n\n
        You now have ${user.coins} coins.`)
        embed.setColor("RED")
      }

        message.channel.send(embed)

    })
  }
}

