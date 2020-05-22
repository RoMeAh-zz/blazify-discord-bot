const { MessageEmbed } = require("discord.js");
const Settings = require("../../models/configsetting.js");
const Prefix = require("../../models/prefix.js");
const PerGuildLogandWelcome = require("../../models/perguildlogandwelcome.js");
let setting1;
let setting2;
let setting3;
let setting4;
let setting5;
let setting6;
let setting7;
let setting8;
let setting9;
let setting10;
let setting11;
let setting12;
let setting13;
let setting14;
let setting15;
let setting16;
let setting17;
let setting18;
let setting19;
let setting20;
const BlazifyClient = require("../../base/Command")
class Config extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "config",
      description: "Xonfiguration of the Bot in the server",
      usage: "b3config",
      category: "Utility",
      cooldown: 1000,
      aliases: ["settings"],
      permLevel: 1,
      permission: "MANAGE_SERVER"
    });
  }
async run(client, message, args) {

    if (!message.member.hasPermission(["MANAGE_GUILD"]))
      return message.channel.send("You don't have the required permissions!");

    await Settings.findOne({ guildID: message.guild.id }, (err, guild) => {
      if (err) console.log(err);
      setting1 = guild.enableXPCoins;
      setting2 = guild.enableXP;
      setting3 = guild.enableCaptcha;
      setting4 = guild.enableVerification;
      setting5 = guild.enableAntiSpam;
      setting6 = guild.enableMusic;
      setting7 = guild.enableEconomy;
      setting8 = guild.enableGaming;
      setting9 = guild.enableUtility;
      setting10 = guild.enableFun;
      setting11 = guild.enableModeration;
      setting12 = guild.enableWelcome;
      setting13 = guild.enableGiveaway;
    });

    await Prefix.findOne({ guildID: message.guild.id }, async (err, guild) => {

      if (err) console.log(err);

      setting14 = guild.prefix;
    });
    await PerGuildLogandWelcome.findOne({ guildID: message.guild.id }, async (err, guild) => {

      if (err) console.log(err);

    setting15 = guild.logChannel;
    setting16 = guild.reportChannel;
    setting17 = guild.welcomeChannel;
    setting18 = guild.welcomeMessage;
    setting19 = guild.leaverChannel;
    setting20 = guild.leaverMessage;
})

    let embed = new MessageEmbed()
    .setTitle(`Settings for ${message.guild.name}`)
    .setDescription(`To enable or configure a setting, do \`${setting14}config <setting> <true || false || prefix>\`\n\nCurrent settings:`)
    .setThumbnail(message.guild.iconURL)
    .addField("Enable XP Coins system", setting1)
    .addField("Enable XP System", setting2)
    .addField("Captcha Verification", setting3)
    .addField("Verification System", setting4)
    .addField("Anti-Spam", setting5)
    .addField("Music (Commands)", setting6)
    .addField("Economy (Commands)", setting7)
    .addField("Gaming (Commands)", setting8)
    .addField("Utility (Commands)", setting9)
    .addField("Fun (Commands)", setting10)
    .addField("Moderation (Commands)", setting11)
    .addField("Welcoming (Commands)", setting12)
    .addField("Giveaway (Commands)", setting13)
    .addField("Log Channel", setting15)
    .addField("Report Channel", setting16)
    .addField("Welcome Channel", setting17)
    .addField("Leaver Channel", setting19)
    .addField("Leaver Message", setting20)
    .addField("Welcome Messgage", setting18)
    .addField("Prefix", setting14)
    .setFooter(`${message.guild.name}`, message.guild.displayAvatarURL)
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
        case "enablemoderation": {
          if (boolean === "true") {
                      await Settings.findOne(
              { guildID: message.guild.id },
              (err, settings) => {
                if (err) console.log(err);

                settings.enableModeration = true;
                settings.save().catch(err => console.log(err));
              }
            );
            return message.channel.send("Enabled Moderation Commands");
          } else if (boolean === "false") {
                      await Settings.findOne(
              { guildID: message.guild.id },
              (err, settings) => {
                if (err) console.log(err);

                settings.enableModeration = false;
                settings.save().catch(err => console.log(err));
              }
            );

            return message.channel.send("Disabled Moderation Commands");
          }
        }
        break;
        case "enablemusic": {
          if (boolean === "true") {
                      await Settings.findOne(
              { guildID: message.guild.id },
              (err, settings) => {
                if (err) console.log(err);

                settings.enableMusic = true;
                settings.save().catch(err => console.log(err));
              }
            );
            return message.channel.send("Enabled Music Commands");
          } else if (boolean === "false") {
                      await Settings.findOne(
              { guildID: message.guild.id },
              (err, settings) => {
                if (err) console.log(err);

                settings.enableMusic = false;
                settings.save().catch(err => console.log(err));
              }
            );

            return message.channel.send("Disabled Music Commands");
          }
        }
          break;
          case "enablefun": {
            if (boolean === "true") {
                        await Settings.findOne(
                { guildID: message.guild.id },
                (err, settings) => {
                  if (err) console.log(err);

                  settings.enableFun = true;
                  settings.save().catch(err => console.log(err));
                }
              );
              return message.channel.send("Enabled Fun Commands");
            } else if (boolean === "false") {
                        await Settings.findOne(
                { guildID: message.guild.id },
                (err, settings) => {
                  if (err) console.log(err);

                  settings.enableFun = false;
                  settings.save().catch(err => console.log(err));
                }
              );

              return message.channel.send("Disabled Fun Commands");
            }
          }
            break;
            case "enableeconomy": {
              if (boolean === "true") {
                          await Settings.findOne(
                  { guildID: message.guild.id },
                  (err, settings) => {
                    if (err) console.log(err);

                    settings.enableEconomy = true;
                    settings.save().catch(err => console.log(err));
                  }
                );
                return message.channel.send("Enabled Economy Commands");
              } else if (boolean === "false") {
                          await Settings.findOne(
                  { guildID: message.guild.id },
                  (err, settings) => {
                    if (err) console.log(err);

                    settings.enableEconomy = false;
                    settings.save().catch(err => console.log(err));
                  }
                );

                return message.channel.send("Disabled Economy Commands");
              }
            }
              break;
              case "enablegaming": {
                if (boolean === "true") {
                            await Settings.findOne(
                    { guildID: message.guild.id },
                    (err, settings) => {
                      if (err) console.log(err);

                      settings.enableGaming = true;
                      settings.save().catch(err => console.log(err));
                    }
                  );
                  return message.channel.send("Enabled Gaming Commands");
                } else if (boolean === "false") {
                            await Settings.findOne(
                    { guildID: message.guild.id },
                    (err, settings) => {
                      if (err) console.log(err);

                      settings.enableGaming = false;
                      settings.save().catch(err => console.log(err));
                    }
                  );
                  return message.channel.send("Disabled Gaming Commands");
                }
              }
                break;
                case "enableutility": {
                  if (boolean === "true") {
                              await Settings.findOne(
                      { guildID: message.guild.id },
                      (err, settings) => {
                        if (err) console.log(err);

                        settings.enableUtility = true;
                        settings.save().catch(err => console.log(err));
                      }
                    );
                    return message.channel.send("Enabled Utility Commands");
                  } else if (boolean === "false") {
                              await Settings.findOne(
                      { guildID: message.guild.id },
                      (err, settings) => {
                        if (err) console.log(err);

                        settings.enableUtility = false;
                        settings.save().catch(err => console.log(err));
                      }
                    );

                    return message.channel.send("Disabled Utility Commands");
                  }
                }
                  break;
                  case "enablegiveaways": {
                    if (boolean === "true") {
                                await Settings.findOne(
                        { guildID: message.guild.id },
                        (err, settings) => {
                          if (err) console.log(err);

                          settings.enableGiveaway = true;
                          settings.save().catch(err => console.log(err));
                        }
                      );
                      return message.channel.send("Enabled Giveaway Commands");
                    } else if (boolean === "false") {
                                await Settings.findOne(
                        { guildID: message.guild.id },
                        (err, settings) => {
                          if (err) console.log(err);

                          settings.enableGiveaway = false;
                          settings.save().catch(err => console.log(err));
                        }
                      );

                      return message.channel.send("Disabled Giveaway Commands");
                    }
                  }
                    break;
                    case "enablewelcoming": {
                      if (boolean === "true") {
                                  await Settings.findOne(
                          { guildID: message.guild.id },
                          (err, settings) => {
                            if (err) console.log(err);

                            settings.enableWelcome = true;
                            settings.save().catch(err => console.log(err));
                          }
                        );
                        return message.channel.send("Enabled Welcome Message");
                      } else if (boolean === "false") {
                                  await Settings.findOne(
                          { guildID: message.guild.id },
                          (err, settings) => {
                            if (err) console.log(err);

                            settings.enableWelcome = false;
                            settings.save().catch(err => console.log(err));
                          }
                        );

                        return message.channel.send("Disabled Welcome Message");
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
      };
      break;
      case "logchannel": {
          let lgc = args[1];

        await PerGuildLogandWelcome.findOne({ guildID: message.guild.id }, (err, perguildlogandwelcome) => {

          if (err) console.log(err);

          console.log(perguildlogandwelcome);

          if (!perguildlogandwelcome) {
            const newPerGuildLogandWelcome = new PerGuildLogandWelcome({
              guildID: message.guild.id,
              logChannel: lgc,
            })
            newPerGuildLogandWelcome.save().catch(err => console.log(err));
          };

          perguildlogandwelcome.save().catch(err => console.log(err));
        })
        return message.channel.send(`Set the guild log channel to: ${lgc}`);
    }
    break;
    case "reportchannel": {
        let rgc = args[1];

      await PerGuildLogandWelcome.findOne({ guildID: message.guild.id }, (err, perguildlogandwelcome) => {

        if (err) console.log(err);

        console.log(perguildlogandwelcome);

        if (!perguildlogandwelcome) {
          const newPerGuildLogandWelcome = new PerGuildLogandWelcome({
            guildID: message.guild.id,
            reportChannel: rgc,
          })
          newPerGuildLogandWelcome.save().catch(err => console.log(err));
        };


        perguildlogandwelcome.save().catch(err => console.log(err));
      })
      return message.channel.send(`Set the guild report channel to: ${rgc}`);
  }
  break;
  case "welcomechannel": {
      let wgc = args[1];

    await PerGuildLogandWelcome.findOne({ guildID: message.guild.id }, (err, perguildlogandwelcome) => {

      if (err) console.log(err);

      console.log(perguildlogandwelcome);

      if (!perguildlogandwelcome) {
        const newPerGuildLogandWelcome = new PerGuildLogandWelcome({
          guildID: message.guild.id,
          welcomeChannel: wgc,
        })
        newPerGuildLogandWelcome.save().catch(err => console.log(err));
      };

      perguildlogandwelcome.save().catch(err => console.log(err));
    })
    return message.channel.send(`Set the guild welcome channel to: ${wgc}`);
}
break;
case "welcomeMessage": {
    let wmsg = args.slice(1).join(" ");

  await PerGuildLogandWelcome.findOne({ guildID: message.guild.id }, (err, perguildlogandwelcome) => {

    if (err) console.log(err);

    console.log(perguildlogandwelcome);

    if (!perguildlogandwelcome) {
      const newPerGuildLogandWelcome = new PerGuildLogandWelcome({
        guildID: message.guild.id,
        welcomeMessage: wmsg,
      })
      newPerGuildLogandWelcome.save().catch(err => console.log(err));
    };



    perguildlogandwelcome.save().catch(err => console.log(err));
  })
  return message.channel.send(`Set the guild log channel to: ${wmsg}`);
}
break;
case "leaverchannel": {
    let legc = args[1];

  await PerGuildLogandWelcome.findOne({ guildID: message.guild.id }, (err, perguildlogandwelcome) => {

    if (err) console.log(err);

    console.log(perguildlogandwelcome);

    if (!perguildlogandwelcome) {
      const newPerGuildLogandWelcome = new PerGuildLogandWelcome({
        guildID: message.guild.id,
        leaverChannel: legc,
      })
      newPerGuildLogandWelcome.save().catch(err => console.log(err));
    };

    perguildlogandwelcome.save().catch(err => console.log(err));
  })
  return message.channel.send(`Set the guild leaver channel to: ${legc}`);
}
break;
case "leavermessage": {
    let lmsg = args.slice(1).join(" ");

  await PerGuildLogandWelcome.findOne({ guildID: message.guild.id }, (err, perguildlogandwelcome) => {

    if (err) console.log(err);

    console.log(perguildlogandwelcome);

    if (!perguildlogandwelcome) {
      const newPerGuildLogandWelcome = new PerGuildLogandWelcome({
        guildID: message.guild.id,
        leaverMessage: lmsg,
      })
      newPerGuildLogandWelcome.save().catch(err => console.log(err));
    };

    perguildlogandwelcome.save().catch(err => console.log(err));
  })
  return message.channel.send(`Set the leaver message to: ${lmsg}`);
}
break;
  }
}
}
module.exports = Config;