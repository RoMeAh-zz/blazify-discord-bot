const { MessageEmbed } = require("discord.js");
const Coins = require("../../models/coin.js");
let stealercoins;
let victimcoins;
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class RemoveMoney extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "rob",
      description: "Removes money from a certain user",
      usage: "b3remove-money 100 @user",
      category: "Economy",
      cooldown: 1000,
      aliases: ["steal"],
      permLevel: 1,
      permission: "MANAGE_SERVER"
    });
  }
async run(client, message, args) {
     const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableEconomy} = guildSettings;
if(!enableEconomy) return message.channel.send("Hmm it seems like the Economy commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
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
module.exports = RemoveMoney;