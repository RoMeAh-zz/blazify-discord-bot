const Blacklist = require("../models/blacklist.js");
const Money = require("../models/money.js");
const Prefix = require("../models/prefix.js");
const XP = require("../models/xp.js");
const Settings = require("../models/configsetting.js");
class Message {
  constructor(client) {
    this.client = client;
  }
  
 async run(message) {

  if (message.author.bot) return;

  if (!message.member)
    message.member = (await message.guild.members.fetch(message.author));

  const guildPrefix = (await Prefix.findOne({ guildID: message.guild.id }));
  const prefix = (guildPrefix ? guildPrefix.prefix : "b3") || "b3";

  const guildSettings =
    (await Settings.findOne({ guildID: message.guild.id })) ||
    new Settings({
      guildID: message.guild.id,
    });

  const { enableXP, enableXPCoins, enableAntiSpam } = guildSettings;

  if (enableXP) {
    let addXP = Math.floor(Math.random() * 10 + 1);
    await XP.findOne(
      { userID: message.author.id, guildID: message.guild.id },
      async (err, xp) => {
        if (err) console.log(err);

        if (!xp) {
          const newXP = new XP({
            userID: message.author.id,
            guildID: message.guild.id,
            userName: message.author.username,
            xp: addXP,
            level: 1,
          });
          newXP.save().catch((err) => console.log(err));
        } else {
          xp.xp = xp.xp + addXP;
          let nextLevel = xp.level * 300;

          if (nextLevel <= xp.xp) {
            xp.level = xp.level + 1;

            xp.save().catch((err) => console.log(err));
            const channel =
              message.guild.channels.cache.find(
                (c) => c.name === "level-up"
              ) || message.channel;
            return channel.send(
              `${message.author.tag} has hit level ${xp.level}`
            );
          }
        }
      }
    );
  }

  if (enableXPCoins) {
    let coinstoadd = Math.ceil(Math.random() * 5) + 5;
    Money.findOne(
      {
        userID: message.author.id,
        userName: message.author.username,
        serverID: message.guild.id,
      },
      (err, money) => {
        if (err) console.log(err);
        if (!money) {
          const newMoney = new Money({
            userID: message.author.id,
            userName: message.author.username,
            serverID: message.guild.id,
            money: coinstoadd,
          });
          newMoney.save().catch((err) => console.log(err));
        } else {
          money.money = money.money + coinstoadd;
          money.save().catch((err) => console.log(err));
        }
      }
    );
  }
  if (enableAntiSpam) {
    const usersMap = new Map();
    const LIMIT = 5;
    const TIME = 3000;
    const DIFF = 1000;
    if (usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference =
        message.createdTimestamp - lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;
      if (difference > DIFF) {
        clearTimeout(timer);
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
          usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, userData);
      } else {
        ++msgCount;
        if (parseInt(msgCount) === LIMIT) {
          const role = message.guild.roles.cache.find("Muted");
          message.member.roles.add(role);
          message.channel.send("You have been muted.");
          setTimeout(() => {
            message.member.roles.remove(role);
            message.channel.send("You have been unmuted");
          }, TIME);
        } else {
          userData.msgCount = msgCount;
          usersMap.set(message.author.id, userData);
        }
      }
    } else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, TIME);
      usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn,
      });
    }
  }

  const bc =
    (await Blacklist.findOne({ userID: message.author.id })) ||
    new Blacklist({
      userID: message.author.id,
    });
  const { blacklisted } = bc;
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    if (blacklisted)
    return message.reply("**You have been __Blacklisted__ from the client**");
    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(prefix.length);
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
    if (!cmd) return;
    if (cmd.cooldown.has(message.author.id)) return message.channel.send(`Sorry, you need to wait till the cooldown ends as due to our low specification system we have a cooldown but you can can help by donating in [paypal](https://paypal.me/roahgaming)`);
    cmd.setMessage(message);
    cmd.run(message, args);
    if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
}
};
module.exports = Message;
