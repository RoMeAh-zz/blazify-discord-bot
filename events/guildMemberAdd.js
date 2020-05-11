require('dotenv').config();
const { Client } = require('discord.js');
const createCaptcha = require('./captcha.js');
//const fs = require('fs').promises;
const Settings = require("../models/configsetting.js");
let enableCaptcha;

module.exports = async (client, member, message ) => {

    const channel = member.guild.channels.cache.get(channel => channel.id === "698993173560688741");
  if (!channel) return;
  channel.send(`Welcome to the Blaze 3 Official Server ${member}`)
  const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
    guildID: message.guild.id
});
const {enableVerification} = guildSettings;
if(!enableVerification) return message.channel.send("Hmm it seems like the Verification commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)")
  const captcha = await createCaptcha();
    try {
        const msg = await member.send('You have 5 Minutes to solve the captcha', {
            files: [{
                attachment: `C:/Users/Romeah but no gaming/Documents/captchas/${captcha}.png`,
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
                await member.roles.add("700392946863833249");
                await fs.unlink(`C:/Users/Romeah but no gaming/Documents/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
            }
        }
        catch(err) {
            console.log(err);
            await msg.channel.send('You did not solve the captcha correctly on time and you were kicked out of the server');
            await member.kick();
            await fs.unlink(`C:/Users/Romeah but no gaming/Documents/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
  }
