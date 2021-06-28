import { Message, MessageEmbed, version as djsversion } from "discord.js";
import { utc } from "moment";
import os from "os";
import ms from "ms";
import { Command } from "discord-akairo";

export default class extends Command {
  constructor() {
    super("botinfo", {
      aliases: ["botinfo", "aboutbot"],
      description: "Shows the ping",
      userPermissions: ["SEND_MESSAGES"],
      category: "Information",
    });
  }

  public exec(message: Message) {
    const core = os.cpus()[0];
    const embed = new MessageEmbed()
      .setThumbnail(this.client.user?.displayAvatarURL()!)
      .setColor(message.guild?.me?.displayHexColor || "BLUE")
      .addField("General", [
        `**❯ Client:** ${this.client.user?.tag} (${this.client.user?.id})`,
        `**❯ Commands:** ${this.handler.modules.size}`,
        `**❯ Servers:** ${this.client.guilds.cache.size.toLocaleString()} `,
        `**❯ Users:** ${this.client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()}`,
        `**❯ Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
        `**❯ Creation Date:** ${utc(this.client.user?.createdTimestamp).format(
          "Do MMMM YYYY HH:mm:ss"
        )}`,
        `**❯ Node.js:** ${process.version}`,
        `**❯ Version:** v1.0.0`,
        `**❯ Discord.js:** v${djsversion}`,
        "\u200b",
      ])
      .addField("System", [
        `**❯ Platform:** ${process.platform}`,
        `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
        `**❯ CPU:**`,
        `\u3000 Cores: ${os.cpus().length}`,
        `\u3000 Model: ${core.model}`,
        `\u3000 Speed: ${core.speed}MHz`,
        `**❯ Memory:**`,
        `\u3000 Total: ${this.formatBytes(process.memoryUsage().heapTotal)}`,
        `\u3000 Used: ${this.formatBytes(process.memoryUsage().heapUsed)}`,
      ])
      .setTimestamp();

    return message.util?.send(embed);
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }
}
