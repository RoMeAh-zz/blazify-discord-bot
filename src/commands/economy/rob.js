const { RichEmbed } = require("discord.js");
const Coins = require("../../models/coin.js");
let stealercoins;
let victimcoins;
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class Rob extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "rob",
      description: "Steals money from a certain user",
      usage: "b3rob @Noob",
      category: "economy",
      cooldown: 1000,
      aliases: ["steal"],
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
    if (!args[0]) return message.channel.send("You need to mention someone");

    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    let minimum = 500;

    console.log(user.id);

    if (message.author.id === user.id) return message.channel.send("You can't rob yourself!");

    let stealer = message.author;
    let victim = user;

    await Coins.findOne({ userID: message.author.id }, (err, coins) => {

      if (err) console.log(err);

      stealercoins = coins.coins;
    })

    await Coins.findOne({ userID: victim.id }, (err, coins) => {

      if (err) console.log(err);

      victimcoins = coins.coins;
    })

    if (stealercoins < minimum) return message.channel.send(`You need ${minimum} coins to attempt to rob someone`);
    if (victimcoins < minimum) return message.channel.send(`Your victim doesn't have ${minimum} coins.`);

    let chance = Math.floor(Math.random() * 100 + 1);

    if (chance <= 60) {
      let lose;
      if ((victimcoins * 0.05) < 500) {
        lose = 500;
      } else {
        lose = victimcoins * 0.05;
      }

      await Coins.findOne({ userID: message.author.id }, (err, coins) => {

        if (err) console.log(err);

        coins.coins = coins.coins - lose;
        coins.save().catch(err => console.log(err));
      })

      await Coins.findOne({ userID: victim.id }, (err, coins) => {

        if (err) console.log(err);

        coins.coins = +coins.coins + +lose;
        coins.save().catch(err => console.log(err));
      })
      return message.channel.send(`The police caught you, and you had to pay ${lose} coins in fines`);
    } else if (chance > 80 && chance <= 90) {
      let win = Math.round(victimcoins * 0.5);

      await Coins.findOne({ userID: message.author.id }, (err, coins) => {

        if (err) console.log(err);

        coins.coins = +coins.coins + +win;
        coins.save().catch(err => console.log(err));
      });

      await Coins.findOne({ userID: victim.id }, (err, coins) => {

        if (err) console.log(err);

        coins.coins = coins.coins - win;
        coins.save().catch(err => console.log(err));
      });
      return message.channel.send(`You stole ${win} coins from ${victim}`);
    } else {
      let win = Math.round(victimcoins);

      await Coins.findOne({ userID: message.author.id }, (err, coins) => {

        if (err) console.log(err);

        coins.coins = +coins.coins + +win;
        coins.save().catch(err => console.log(err));
      });

    await Coins.findOne({ userID: victim.id }, (err, coins) => {

      if (err) console.log(err);

      coins.coins = coins.coins - coins.coins;
      coins.save().catch(err => console.log(err));
    })
      return message.channel.send(`You stole ${win} coins.`)
    }
  }
};
module.exports = Rob;