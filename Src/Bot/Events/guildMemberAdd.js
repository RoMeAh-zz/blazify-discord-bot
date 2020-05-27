require("dotenv").config();
const { Client } = require("discord.js");
const createCaptcha = require("./captcha.js");
const fs = require("fs").promises;
const PerGuildLogandWelcome = require("../../Lib/Database/models/perguildlogandwelcome.js");
const Settings = require("../../Lib/Database/models/configsetting.js");

class guildMemberAdd {
  constructor(member) {
    this.member = member;
  }
  
 async run(member) {
  const guildSettings =
    (await Settings.findOne({ guildID: member.guild.id })) ||
    new Settings({
      guildID: message.guild.id,
    });

  const guildTandC =
    (await PerGuildLogandWelcome.findOne({ guildID: member.guild.id })) ||
    new PerGuildLogandWelcome({
      guildID: message.guild.id,
    });

  const { enableCaptcha, enableWelcome } = guildSettings;
  const { welcomeChannel, welcomeMessage, verifyRole } = guildTandC;

  if (enableWelcome) {
    const channel = member.guild.channels.cache.get(welcomeChannel.id);
    if (!channel) return;
    channel.send(`${welcomeMessage}`);
  }

  if (enableCaptcha) {
    const captcha = await createCaptcha();
    try {
      const msg = await member.send("You have 5 Minutes to solve the captcha", {
        files: [
          {
            attachment: `C:/Users/Romeah but no gaming/Documents/captchas/${captcha}.png`,
            name: `${captcha}.png`,
          },
        ],
      });
      try {
        const filter = (m) => {
          if (m.author.client) return;
          if (m.author.id === member.id && m.content === captcha) return true;
          else {
            m.channel.send("You entered the captcha incorrectly.");
            return false;
          }
        };
        const response = await msg.channel.awaitMessages(filter, {
          max: 1,
          time: 3600000,
          errors: ["time"],
        });
        if (response) {
          await msg.channel.send("You have verified yourself!");
          await member.roles.add(verifyRole.id);
          await fs
            .unlink(
              `C:/Users/Romeah but no gaming/Documents/captchas/${captcha}.png`
            )
            .catch((err) => console.log(err));
        }
      } catch (err) {
        console.log(err);
        await msg.channel.send(
          "You did not solve the captcha correctly on time and you were kicked out of the server"
        );
        await member.kick();
        await fs
          .unlink(
            `C:/Users/Romeah but no gaming/Documents/captchas/${captcha}.png`
          )
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  }
};
}
module.exports = guildMemberAdd;