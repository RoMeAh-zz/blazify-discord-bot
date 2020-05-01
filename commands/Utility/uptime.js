const Discord = require('discord.js');
const Settings = require("../models/configsetting.js");
let days = 0;
let week = 0;

module.exports = {
        name: "uptime",
        description: "Get steam statistics of a user",
        usage: "<user>",
        category: "miscellaneous",
        accessableby: "Members",
  run: async (client, message, args) => {
    let allGuilds = client.guilds.cache.array();
    for (let i = 0; i < allGuilds.length; i++) {
    Settings.findOne(
      { guildID: allGuilds[i].id },
      async (err, settings) => {
        if (err) console.log(err);

        if (!settings) {
          enableCaptcha = false;
        } else {
          enableCaptcha = settings.enableCaptcha
        }
      })
    }
    let uptime = ``;
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    if(hours > 23){
        days = days + 1;
        hours = 0;
    }

    if(days == 7){
        days = 0;
        week = week + 1;
    }

    if(week > 0){
        uptime += `${week} week, `;
    }

    if(minutes > 60){
        minutes = 0;
    }

  uptime += `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

    let serverembed = new MessageEmbed()
        .setColor("#f00c0c")
        .addField('Uptime Bot', uptime)
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`)

    message.channel.send(serverembed);

}
}
