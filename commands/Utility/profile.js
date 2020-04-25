const { MessageEmbed } = require("discord.js");
let XP = require("../../models/xp.js");
let Coin = require("../../models/coin.js");
let Money = require("../../models/money.js");
let Settings = require("../../models/configsetting.js");

module.exports = {
    name: "profile",
    aliases: ["pf"],
    category: "Utility",
    description: "Shows profile of a user",
    run: async (client, message, args) => {
      let allGuilds = client.guilds.cache.array();
      for (let i = 0; i < allGuilds.length; i++) {
      Settings.findOne(
        { guildID: allGuilds[i].id },
        async (err, settings) => {
          if (err) console.log(err);

          if (!settings) {
            enableUtility = false;
          } else {
            enableUtility = settings.enableUtility
          }
        })
      }
      if(enableUtility === true) {

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
        .addField("Coins:", coins);

        await Settings.findOne({ guildID: message.guild.id }, async (err, settings) => {

          if (err) console.log(err)

          if (!settings) {
            settings.enableXP = false;
            settings.eanbleXPCoins = false;
          }

          if (settings.enableXPCoins === true) {
            await profile.addField("XPCoins:", xpcoins)
          } else
          if (settings.enableXP === true) {
            await profile.addField("XP", `${xp}/${Math.round(level * 300)}`)
            await profile.addField("Level", level)
          }
        });

        return message.channel.send(profile);
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
        .addField("Coins:", coins);

        await Settings.findOne({ guildID: message.guild.id }, async (err, settings) => {

          if (err) console.log(err)

          if (!settings) {
            settings.enableXPCoins = false;
            settings.enableXP = false;
          }

          if (settings.enableXPCoins === true) {
            await profile.addField("XPCoins:", xpcoins)
          } else
          if (settings.enableXP === true) {
            await profile.addField("XP", `${xp}/${Math.round(level * 300)}`)
            await profile.addField("Level", level)
          }
        })
        return message.channel.send(profile);
        };


}
      }
    }
