import { Command } from "discord-akairo";
import { Message } from "discord.js";

import { MessageEmbed, version } from "discord.js" ;
import os from 'os';
const cpuStat = require("cpu-stat");
import { formatTime } from "../../../Lib";
export default class BotInfo extends Command {
    public constructor() {
        super("botinfo", {
            aliases: ["botinfo", "bip"],
            category: "Utility",
            description: {
                content: "Bot Info",
                usage: "<<ping",
                examples: [
                    "ping"
                ]
            },
            ratelimit: 3
        });
    }

    public async exec(message: Message): Promise<Message> {
   let cpuLol;
   cpuStat.usagePercent(function(err: string, percent: number, seconds: number) {
       embedStats.addField("� CPU usage", `\`${percent.toFixed(2)}%\``, true)
   })
     const duration = formatTime(Number(this.client.uptime));
     const embedStats = new MessageEmbed()
     .setAuthor(this.client.user?.username)
     .setTitle("__**Stats:**__")
     .setColor("RANDOM")
     .addField("� Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
     .addField("� Uptime ", `${duration}`, true)
     .addField("� Users", `${this.client.users.cache.size.toLocaleString()}`, true)
     .addField("� Servers", `${this.client.guilds.cache.size.toLocaleString()}`, true)
     .addField("� Channels ", `${this.client.channels.cache.size.toLocaleString()}`, true)
     .addField("� Discord.js", `Version - ${version}`, true)
     .addField("� Node", `${process.version}`, true)
     .addField("� CPU", `\`\`\`md\n${os.cpus().map((i: { model: string; }) => `${i.model}`)[0]}\`\`\``)
     .addField("� Arch", `\`${os.arch()}\``, true)
     .addField("� Platform", `\`\`${os.platform()}\`\``, true)
     .addField("API Latency", `${Math.round(this.client.ws.ping)}ms`)
     return message.util!.send(embedStats)
 }
}