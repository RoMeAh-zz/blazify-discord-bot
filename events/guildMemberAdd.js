require('dotenv').config();
const { Client, RichEmbed } = require('discord.js');
const client = new Client();
const guildInvites = new Map();
const createCaptcha = require('./captcha.js');
const fs = require('fs').promises;
const verifiedRole = require("../config.json").vRole;
module.exports = async (client,member ) => {
  
    const channel = member.guild.channels.find(
    channel => channel.name === "temp-chat"
  );
  if (!channel) return;
  channel.send(`Welcome to the Blaze 3 Official Server ${member}`);
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
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time']});
            if(response) {
                await msg.channel.send('You have verified yourself!');
                await member.addRole("690664505037946951");
                await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
            }
        }
        catch(err) {
            console.log(err);
            await msg.channel.send('You did not solve the captcha correctly on time.');
            await member.kick();
            await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
    
  
}