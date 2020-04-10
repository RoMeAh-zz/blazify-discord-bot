const {RichEmbed, Discord} = require('discord.js');
const mongoose = require("mongoose");
const Warn = require("../../models/warn.js")

module.exports = {
    name: "warnings",
    category: "fun",
    description: "XP",
    run: async (client, message, args) => {
    await message.delete();
    if (args[0]) {
        let member = message.mentions.members.first();
  
  
        await Warn.findOne({ userID: member.user.id, guildID: message.guild.id }, (err, warns) => {
          if (err) console.log(err);
  
          if (!warns) {
            const newWarn = new Warn({
              userName: message.author.username,
              userID: message.author.id,
              guildID: message.guild.id,
              warns: warns.warns,
              });
          }
  
          let warnings = warns.warns;
  
          let rip = new RichEmbed()
            .setTitle(`${member.user.username}'s Warnings`)
            .setColor('#ed0e0e')
            .addField("Warnings", warnings);
  
          message.channel.send(rip);
        });
      } else {
        await Warn.findOne({ userID: message.author.id, guildID: message.guild.id }, (err, warns) => {
          if (err) console.log(err);
  
          if (!warns) {
            const newWarn = new Warn({
              userID: message.author.id,
              userName: message.author.username,
              guildID: message.guild.id,
              warns: warns.warns + warns.warns,
              __v: +1
            });
            console.log("??");
            newWarn.save().catch(err => console.log(err));
          }
  
          let warnings = warns.warns;
  
          let rip = new RichEmbed()
            .setTitle(`${message.author.username}'s Warnings`)
            .setColor('#ed0e0e')
            .addField("Warnings", warnings);
  
          message.channel.send(rip);
        });
      }
    }
  };
