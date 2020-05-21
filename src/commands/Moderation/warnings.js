const { MessageEmbed, Discord } = require('discord.js');
const mongoose = require("mongoose");
const Warn = require("../../models/warn.js")
const Settings = require("../../models/configsetting.js");
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
async run(message, args) {
    await message.delete();
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
      guildID: message.guild.id
  });
  const {enableModeration} = guildSettings;
if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
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

          let embed = new MessageEmbed()
            .setTitle(`${user.username}'s Warnings`)
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
              warns: warns.warns,
            });
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
