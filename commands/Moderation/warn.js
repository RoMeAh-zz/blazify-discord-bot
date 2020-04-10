const Discord = require('discord.js');
const mongoose = require("mongoose");
const Warn = require("../../models/warn.js")
module.exports = {
    name: "warn",
    category: "fun",
    description: "XP",
    run: async (client, message, args) => {
    await message.delete();
    let user = message.mentions.members.first() || message.author;
let rip = args.slice(1).join(" ")
Warn.findOne(
  { userID: user.id, guildID: message.guild.id },
  (err, warns) => {
    if (err) console.log(err);
    if (!warns) {
      const newWarn = new Warn({
        userID: user.id,
        userName: user.username,
        guildID: message.guild.id,
        warns: rip,
      });
      newWarn.save().catch(err => console.log(err));
      return message.channel.send(`Gave ${message.mentions.members.first() ? user.user.username : user.username} a warning for ${rip}.`);
    }else {
        const newWarn = new Warn({
            userID: user.id,
            userName: user.username,
            guildID: message.guild.id,
            warns: rip
        })
        newWarn.save().catch(err => console.log(err));
      return message.channel.send(`Gave ${message.mentions.members.first() ? user.user.username : user.username} a warning for ${rip}.`);
  }
  })
}
}