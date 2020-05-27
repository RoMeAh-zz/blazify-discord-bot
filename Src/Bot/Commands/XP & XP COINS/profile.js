const { MessageEmbed } = require("discord.js");
let XP = require("../../../Lib/Database/models/xp.js");
let Coin = require("../../../Lib/Database/models/coin.js");
let Money = require("../../../Lib/Database/models/money.js");
let Settings = require("../../../Lib/Database/models/configsetting.js");

const BlazifyClient = require("../../../Lib/Base/Command");
class Profile extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "profile",
      description: "Shows the Profile of a user",
      usage: "b3profile",
      category: "XP & XP COINS",
      cooldown: 1000,
      aliases: ["pf"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(client, message, args) {
      if (args[0]) {

        let xp;
        let level;
        let coins;
        let xpcoins;
        let member = message.mentions.members.first();

        await XP.findOne({ userID: member.user.id, guildID: message.guild.id }, (err, xps) => {

          if (err) console.log(err);

          if (!xps) {
            xp = 0;
            level = 1;
          } else {
            xp = xps.xp;
            level = xps.level;
          };
        });

        await Coin.findOne({ userID: member.user.id }, (err, coin) => {

          if (err) console.log(err);

          if (!coin) {
            coins = 0;
          } else {
            coins = coin.coins;
          };
        });

        await Money.findOne({ userID: member.user.id, serverID: message.guild.id }, (err, xpcoin) => {

          if (err) console.log(err);

          if (!xpcoin) {
            xpcoins = 0;
          } else {
            xpcoins = xpcoin.money;
          };
        });

        let profile = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle(`${member.user.username}'s Profile`)
        .addField("Coins:", coins)
        .addField("XP", `${xp}/${Math.round(level * 300)}`)
        .addField("Level", level)
        message.channel.send(profile);
          } else {

        let xp;
        let level;
        let coins;
        let xpcoins;

        await XP.findOne({ userID: message.author.id, guildID: message.guild.id }, (err, xps) => {

          if (err) console.log(err);

          if (!xps) {
            xp = 0;
            level = 1;
          } else {
            xp = xps.xp;
            level = xps.level;
          };
        });

        await Coin.findOne({ userID: message.author.id }, (err, coin) => {

          if (err) console.log(err);

          if (!coin) {
            coins = 0;
          } else {
            coins = coin.coins;
          };
        });

        await Money.findOne({ userID: message.author.id, serverID: message.guild.id }, (err, xpcoin) => {

          if (err) console.log(err);

          if (!xpcoin) {
            xpcoins = 0;
          } else {
            xpcoins = xpcoin.money;
          };
        });

        let profile = new MessageEmbed()
        .setThumbnail(message.author.avatarURL)
        .setColor("#FF0000")
        .setThumbnail(message.author.avatarURL)
        .setTitle(`${message.author.username}'s Profile`)
        .addField("Coins:", coins)
        .addField("XPCoins:", xpcoins)
        .addField("XP", `${xp}/${Math.round(level * 300)}`)
        .addField("Level", level)
 message.channel.send(profile);
        };
      }
    }
module.exports = Profile;