const { MessageEmbed, Discord } = require('discord.js');
const mongoose = require("mongoose");
const Warn = require("../../../Lib/Database/models/warn.js")
const Settings = require("../../../Lib/Database/models/configsetting.js");
const BlazifyClient = require("../../../Lib/Base/Command")
class Warnings extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "warnings",
      description: "Shows the warnings of a User in the server",
      usage: "b3warnings @user",
      category: "Moderation",
      cooldown: 1000,
      aliases: ["m"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(client, message, args) {
    await message.delete();
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
      guildID: message.guild.id
  });
  const {enableModeration} = guildSettings;
if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
    if (args[0]) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send("I was unable to find that user!");

        await Warn.findOne({ userID: member.user.id, guildID: message.guild.id }, (err, warns) => {
          if (err) console.log(err);

          if (!warns) {
            const newWarn = new Warn({
              userName: member.user.username,
              userID: member.id,
              guildID: message.guild.id,
              warns: 0,
              });
            
            newWarn.save().catch(err => console.log(err));
            warns = newWarn;
          }

          let embed = new MessageEmbed()
            .setTitle(`${member.user.username}'s Warnings`)
            .setColor('#ed0e0e')
            if(!warns) {
              embed.addField("Warnings", "The warnings will be shown down below", true);
              return message.channel.send(embed);
            }else {
              embed.addField("Warnings", warns.warns, true)
              return message.channel.send(embed);
        }
        });
      } else {
        await Warn.findOne({ userID: message.author.id, guildID: message.guild.id }, (err, warns) => {
          if (err) console.log(err);

          if (!warns) {
            const newWarn = new Warn({
              userID: message.author.id,
              userName: message.author.username,
              guildID: message.guild.id,
              warns: 0,
            });
            warns = newWarn;
            newWarn.save().catch(err => console.log(err));
          }


          let embed = new MessageEmbed()
            .setTitle(`${message.author.username}'s Warnings`)
            .setColor('#ed0e0e')
            if(!warns) {
              embed.addField("Warnings", "The warnings will be shown down below", true);
               return message.channel.send(embed);
            }else {
              embed.addField("Warnings", warns.warns, true)
              return message.channel.send(embed);
        }
        });
      }
    }
  };
module.exports = Warnings;