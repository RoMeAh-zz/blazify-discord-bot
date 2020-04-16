const { MessageEmbed } = require("discord.js");
const Settings = require("../../models/configsetting.js");
const Prefix = require("../../models/prefix.js");
let setting1;
let setting2;
let setting3;
let setting4;
let setting5;
let setting6;
module.exports = {
  name: "config",
  description: "Configures guild settings",
  usage: "!config",
  category: "Utility",
  accessableby: "Members",
  aliases: ["settings"],
  run: async (client, message, args) => {

    if (!message.member.hasPermission(["MANAGE_GUILD"]))
      return message.channel.send("You don't have the required permissions!");

    await Settings.findOne({ guildID: message.guild.id }, (err, guild) => {
      if (err) console.log(err);
      setting1 = guild.enableXPCoins;
      setting2 = guild.enableXP;
      setting3 = guild.enableCaptcha;
      setting4 = guild.enableVerification;
      setting5 = guild.enableAntiSpam;
    });

    await Prefix.findOne({ guildID: message.guild.id }, async (err, guild) => {

      if (err) console.log(err);

      setting6 = guild.prefix;
    });

    let embed = new MessageEmbed()
    .setTitle(`Settings for ${message.guild.name}`)
    .setDescription(`To enable or configure a setting, do \`${setting4}config <setting> <true || false || prefix>\`\n\nCurrent settings:`)
    .setThumbnail(message.guild.iconURL)
    .addField("Enable XP Coins system", setting1)
    .addField("Enable XP System", setting2)
    .addField("Captcha Verification", setting3)
    .addField("Verification System", setting4)
    .addField("Anti-Spam", setting5)
    .addField("Prefix", setting6)
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
        case "enablecaptcha": {
          if (boolean === "true") {
                      await Settings.findOne(
              { guildID: message.guild.id },
              (err, settings) => {
                if (err) console.log(err);

                settings.enableCaptcha = true;
                settings.save().catch(err => console.log(err));
              }
            );
            return message.channel.send("Enabled Captcha Verification");
          } else if (boolean === "false") {
                      await Settings.findOne(
              { guildID: message.guild.id },
              (err, settings) => {
                if (err) console.log(err);

                settings.enableCaptcha = false;
                settings.save().catch(err => console.log(err));
              }
            );

            return message.channel.send("Disabled Captcha System");
          }
        }
          break;
          case "enableverification": {
            if (boolean === "true") {
                        await Settings.findOne(
                { guildID: message.guild.id },
                (err, settings) => {
                  if (err) console.log(err);

                  settings.enableVerification = true;
                  settings.save().catch(err => console.log(err));
                }
              );
              return message.channel.send("Enabled Verification");
            } else if (boolean === "false") {
                        await Settings.findOne(
                { guildID: message.guild.id },
                (err, settings) => {
                  if (err) console.log(err);

                  settings.enableVerification = false;
                  settings.save().catch(err => console.log(err));
                }
              );

              return message.channel.send("Disabled Verification");
            }
          }
            break;
            case "enableantispam": {
              if (boolean === "true") {
                          await Settings.findOne(
                  { guildID: message.guild.id },
                  (err, settings) => {
                    if (err) console.log(err);

                    settings.enableAntiSpam = true;
                    settings.save().catch(err => console.log(err));
                  }
                );
                return message.channel.send("Enabled Anti-Spam");
              } else if (boolean === "false") {
                          await Settings.findOne(
                  { guildID: message.guild.id },
                  (err, settings) => {
                    if (err) console.log(err);

                    settings.enableAntiSpam = false;
                    settings.save().catch(err => console.log(err));
                  }
                );

                return message.channel.send("Disabled Anti-Spam");
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
