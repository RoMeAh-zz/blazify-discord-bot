const Discord = require('discord.js');
const mongoose = require("mongoose");
const Warn = require("../../models/warn.js")
const lgc = require("../../config.json").logChannel;
module.exports = {
    name: "warn",
    category: "fun",
    description: "XP",
    run: async (client, message, args) => {
    await message.delete();
    let user = message.mentions.members.first() || message.author;
    if(!user)return message.channel.send("You must specify a valid person")
let rip = args.slice(1).join(" ")
if(!args[1])return message.channel.send("Please specify a reason, why to be warned")
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
      let lChannel = message.guild.channels.find(lgc)
        return lChannel.send(`Gave ${message.mentions.members.first() ? user.user.username : user.username} a warning for ${rip}.`)
     } else {
        warns.warns += `
        -------------------------------
        **-${rip}**`
        warns.save().catch(err => console.log(err));
        let lChannel = message.guild.channels.find(channel => channel.name === "logs")
        return lChannel.send(`Gave ${message.mentions.members.first() ? user.user.username : user.username} a warning for ${rip}.`)
  }
  })
}
}