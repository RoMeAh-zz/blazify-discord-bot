require('dotenv').config();
const { Client } = require('discord.js');
const createCaptcha = require('./captcha.js');
const fs = require('fs').promises;
const Settings = require("../models/configsetting.js");
let prefix;
let enableXPCoinsS;
let enableXPS;
let enableCaptchaS;

module.exports = async (client, member, message ) => {
  
    const channel = member.guild.channels.find(
    channel => channel.id === "698993173560688741"
  );
  if (!channel) return;
  channel.send(`Welcome to the Blaze 3 Official Server ${member}`)
  let allGuilds = client.guilds.array();
  for (let i = 0; i < allGuilds.length; i++) {
  await Settings.findOne(
    { guildID: allGuilds[i].id },
    async (err, settings) => {
      if (err) console.log(err);

      if (!settings) {
        enableXPCoinsS = false;
        enableXPS = false;
        enableCaptchaS = false;
      } else {
        enableXPCoinsS = settings.enableXPCoins;
        enableXPS = settings.enableXP;
        enableCaptchaS = settings.enableCaptcha
      }
    })
  }
  if (enableCaptchaS === true) {
  const captcha = await createCaptcha();
    try {
        const msg = await member.send('You have 60 seconds to solve the captcha', {
            files: [{
                attachment: `${__dirname}/captchas/${captcha}.png`,
                name: `${captcha}.png`
            }]
        });
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
                    m.channel.send('You entered the captcha incorrectly.');
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: 3600000, errors: ['time']});
            if(response) {
                await msg.channel.send('You have verified yourself!');
                await member.addRole("690664505037946951");
                await fs.unlink(`C:/Users/Romeah but no gaming/Documents/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
            }
        }
        catch(err) {
            console.log(err);
            await msg.channel.send('You did not solve the captcha correctly on time and you were kicked out of the server');
            await member.kick();
            await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
  }
}