require('dotenv').config();
const Money = require("../models/money.js");
const config = require("../config.json");
const Prefix = require("../models/prefix.js");
const XP = require("../models/xp.js");
const { Client } = require('discord.js');
const createCaptcha = require('./captcha.js');
const fs = require('fs').promises;
const Settings = require("../models/configsetting.js");
let prefix;
let enableXPCoins;
let enableXP;
let enableAntiSpam;
module.exports = async (client, message, member) => {

  // if (message.content.includes(message.mentions.users.first())) {
    //client.afk.forEach(data => {
      //if (data.id === message.mentions.users.first().id) {
        //message.guild.fetchMember(data.id).then(member => {
         //let usertag = member.user.tag;
    //  return message.channel.send(`**${usertag}** is AFK. Reason: ${data.reason}`);
  //    }
  //)}
    // });
   //};

   //let checkafk = client.afk.cache.get(message.author.id);
   //if (checkafk) return [client.afk.delete(message.author.id), message.channel.send(`Your status has been updated, and you are no longer afk.`)]
  let allGuilds = client.guilds.cache.array();
  for (let i = 0; i < allGuilds.length; i++) {
  if(message.author.bot) return;
  Prefix.findOne(
    {
      guildID: allGuilds[i].id
    },
    (err, guild) => {
      if (err) console.error(err);

      if (!guild) {
        prefix = "b3";
      } else {
        prefix = guild.prefix;
      };
    }
  );

  await Settings.findOne(
    { guildID: allGuilds[i].id },
    async (err, settings) => {
      if (err) console.log(err);

      if (!settings) {
        enableXPCoins = false;
        enableXP = false;
        enableAntiSpam = false;
      } else {
        enableXPCoinsS = settings.enableXPCoins;
        enableXPS = settings.enableXP;
        enableAntiSpam = settings.enableAntiSpam
      }
    })
  }

  if (enableXP === true) {
    let addXP = Math.floor(Math.random() * 10 + 1);
console.log(`${addXP}`)
    await XP.findOne({ userID: message.author.id, guildID: message.guild.id }, async (err, xp) => {
      if (err) console.log(err);

      if (!xp) {
        const newXP = new XP({
          userID: message.author.id,
          guildID: message.guild.id,
          userName: message.author.username,
          xp: addXP,
          level: 1
        });
        newXP.save().catch(err => console.log(err));
      }else {

      xp.xp = xp.xp + addXP;
      let nextLevel = xp.level * 300;

      if (nextLevel <= xp.xp) {
        xp.level = xp.level + 1;

        xp.save().catch(err => console.log(err));
        const channel =
          message.guild.channels.find(c => c.name === "level-up") || message.channel;
        return channel.send(
          `${message.author.tag} has hit level ${xp.level}`
        );
            }
          }
    });
  }

  if (enableXPCoins === true) {
    let coinstoadd = Math.ceil(Math.random() * 5) + 5;
    console.log(`${coinstoadd}`)
    Money.findOne(
      { userID: message.author.id, userName: message.author.username, serverID: message.guild.id },
      (err, money) => {
        if (err) console.log(err);
        if (!money) {
          const newMoney = new Money({
            userID: message.author.id,
            userName: message.author.username,
            serverID: message.guild.id,
            money: coinstoadd
          });
          newMoney.save().catch(err => console.log(err));
        } else {
          money.money = money.money + coinstoadd;
          money.save().catch(err => console.log(err));
        }
      }
    );
  }
  if(enableAntiSpam === true) {
    const usersMap = new Map();
const LIMIT = 1;
const TIME = 1000;
const DIFF = 1000;
  if(usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference = message.createdTimestamp - lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;
      console.log(difference);
      if(difference > DIFF) {
        clearTimeout(timer);
        console.log('Cleared timeout');
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
          usersMap.delete(message.author.id);
          console.log('Removed from RESET.');
        }, TIME);
        usersMap.set(message.author.id, userData);
      }
      else {
        ++msgCount;
        if(parseInt(msgCount) === LIMIT) {
          const role = message.guild.roles.cache.find('Muted');
          message.member.roles.add(role);
          message.channel.send('You have been muted.');
          setTimeout(() => {
            message.member.roles.remove(role);
            message.channel.send('You have been unmuted');
          }, TIME);
        } else {
          userData.msgCount = msgCount;
          usersMap.set(message.author.id, userData);
        }
      }
    }

    else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log('Removed from map.');
      }, TIME);
      usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
      });
    }
}

  if (message.channel.type === "dm")
    return message.author.send("You are not supposed to DM Bots");

  //    if (message.content.includes(message.mentions.members.first())) {
  //  let mentioned = await client.afk.get(message.mentions.users.first().id);

  //  if (mentioned) message.channel.send(`**${mentioned.usertag}** is currently afk. Reason: ${mentioned.reason}`);
//  }

  if (!message.content.startsWith(prefix)) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);

  if (!message.member)
    message.member = message.guild.fetchMember(message); ///end it
}
