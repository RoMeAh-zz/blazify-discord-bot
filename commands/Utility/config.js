const { RichEmbed } = require("discord.js");
const Settings = require("../../models/settings.js");
const Prefix = require("../../models/prefix.js");
let setting1;
let setting2;
let setting3;

module.exports = {
  name: "config",
  description: "Configures guild settings",
  usage: "!config",
  category: "Utility",
  accessableby: "Members",
  aliases: [""],
  run: async (client, message, args) => {
    
    if (!message.member.hasPermission(["MANAGE_GUILD"]))
      return message.channel.send("You don't have the required permissions!");
    
    await Settings.findOne({ guildID: message.guild.id }, (err, guild) => {
      
      if (err) console.log(err);
      
      setting1 = guild.enableXPCoins;
      setting2 = guild.enableXP;
    });
    
    await Prefix.findOne({ guildID: message.guild.id }, async (err, guild) => {
      
      if (err) console.log(err);
      
      setting3 = guild.prefix;
    });
    
    let embed = new RichEmbed()
    .setTitle(`Settings for ${message.guild.name}`)
    .setDescription(`To enable or configure a setting, do \`${setting3}config <setting> <true || false || prefix>\`\n\nCurrent settings:`)
    .setThumbnail(message.guild.iconURL)
    .addField("Enable XP Coins system", setting1)
    .addField("Enable XP System", setting2)
    .addField("Prefix", setting3)
    .setFooter(`${message.guild.name}`, message.author.displayAvatarURL)
    .setColor("RANDOM");

    if (!args[0]) return message.channel.send(embed);
    if (!args[1]) return message.channel.send(embed);
    let setting = args[0].toLowerCase();
    let boolean = args[1].toLowerCase();

    switch (setting) {
      case "enablexpcoins": {
        if (boolean === "true") {
          await Settings.findOne(
            { guildID: message.guild.id },
            (err, settings) => {
              if (err) console.log(err);

              settings.enableXPCoins = true;
              settings.save().catch(err => console.log(err));
            }
          );
          return message.channel.send("Enabled XP Coin system");
        } else if (boolean === "false") {
                    await Settings.findOne(
            { guildID: message.guild.id },
            (err, settings) => {
              if (err) console.log(err);

              settings.enableXPCoins = false;
              settings.save().catch(err => console.log(err));
            }
          );
          return message.channel.send("Disabled XP Coin system");
        } 
      }
        break;
      case "enablexp": {
        if (boolean === "true") {
                    await Settings.findOne(
            { guildID: message.guild.id },
            (err, settings) => {
              if (err) console.log(err);

              settings.enableXP = true;
              settings.save().catch(err => console.log(err));
            }
          );
          return message.channel.send("Enabled XP System");
        } else if (boolean === "false") {
                    await Settings.findOne(
            { guildID: message.guild.id },
            (err, settings) => {
              if (err) console.log(err);

              settings.enableXP = false;
              settings.save().catch(err => console.log(err));
            }
          );
          
          return message.channel.send("Disabled XP System");
        }
      }
        break;
      case "prefix": {
          let cprefix = args[1];

        await Prefix.findOne({ guildID: message.guild.id }, (err, prefix) => {
          
          if (err) console.log(err);
          
          console.log(prefix);
          
          if (!prefix) {
            const newPrefix = new Prefix({
              guildID: message.guild.id,
              prefix: cprefix,
            })
            newPrefix.save().catch(err => console.log(err));
          };
          
          prefix.prefix = cprefix;
          
          prefix.save().catch(err => console.log(err));
        })
        return message.channel.send(`Set the guild prefix to: ${cprefix}`);
      }
    }
  }
};
