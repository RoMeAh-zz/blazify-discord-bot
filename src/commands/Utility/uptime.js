const {MessageEmbed} = require('discord.js');
const Settings = require("../../models/configsetting.js");
let days = 0;
let week = 0;
const BlazifyClient = require("../../base/Command")
class Uptime extends BlazifyClient {
    constructor(client) {
      super(client, {
        name: "uptime",
        description: "Shows the time duration from which it is online",
        usage: "b3uptime",
        category: "Utility",
        cooldown: 1000,
        aliases: ["up"],
        permLevel: 1,
        permission: "READ_MESSAGES"
      });
    }
  async run(message, args) {
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
module.exports = Uptime;