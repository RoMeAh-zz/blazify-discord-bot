const { MessageEmbed } = require("discord.js");
const Settings = require("../../models/configsetting.js");
const Coins = require("../../models/coin.js");
let stealercoins;
let victimcoins;

const BlazifyClient = require("../../base/Command");
class AddMoney extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "add-money",
      description: "Adds money to a user",
      usage: "b3add-money 100 @RoMeAh#2064",
      category: "economy",
      cooldown: 1000,
      aliases: ["bc", "blck"],
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

    if (isNaN(args[0])) return message.channel.send("That isn't a valid amount");

    let amt = Math.round(args[0]);

    await Coins.findOne({ userID: user.id }, (err, coins) => {

      if (err) console.log(err);

      coins.coins = coins.coins + +amt
      coins.save().catch(err => console.log(err));

      return message.channel.send(`Gave ${message.mentions.members.first() ? user.user.username : user.username} ${amt} coins.`);
    });
  }
}
module.exports = AddMoney;