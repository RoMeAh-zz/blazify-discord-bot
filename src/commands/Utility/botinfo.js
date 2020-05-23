const { MessageEmbed, Discord } = require("discord.js") ;
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")
const BlazifyClient = require("../../base/Command");
class clientInfo extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "clientinfo",
      description: "Displays the client stats",
      usage: "b3clientinfo",
      category: "Utility",
      cooldown: 1000,
      aliases: ["bio"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(client, message, args) {
   let cpuLol;
   cpuStat.usagePercent(function(err, percent, seconds) {
     if (err) { return console.log(err); }
     const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
     const embedStats = new MessageEmbed()
     .setAuthor(client.user.username)
     .setTitle("__**Stats:**__")
     .setColor("RANDOM")
     .addField("� Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
     .addField("� Uptime ", `${duration}`, true)
     .addField("Developers", `Οㄗ│๒3г๏๓єคђ#2064`, true)
     .addField("� Users", `${client.users.cache.size.toLocaleString()}`, true)
     .addField("� Servers", `${client.guilds.cache.size.toLocaleString()}`, true)
     .addField("� Channels ", `${client.channels.cache.size.toLocaleString()}`, true)
     .addField("� Discord.js", `Version - ${version}`, true)
     .addField("� Node", `${process.version}`, true)
     .addField("� CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
     .addField("� CPU usage", `\`${percent.toFixed(2)}%\``, true)
     .addField("� Arch", `\`${os.arch()}\``, true)
     .addField("� Platform", `\`\`${os.platform()}\`\``, true)
     .addField("API Latency", `${Math.round(client.ws.ping)}ms`)
     .setDescription(`[![Discord clients](https://top.gg/api/widget/696756322825404416.svg)](https://top.gg/client/696756322825404416)`)
     message.channel.send(embedStats)
   });
 }
}
module.exports = clientInfo;