import { Command } from "discord-akairo";
import { Message, MessageEmbed, Util } from "discord.js";

import { decode } from "@lavalink/encoding";

export default class extends Command {
  public constructor() {
    super("nowplaying", {
      aliases: ["nowplaying", "np", "current"],
      description: "Displays current playing music",
      category: "Music",
      channel: "guild",
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  exec(message: Message) {
    const player = this.client.lavaclient.players.get(message.guild?.id!)!;

    const { title, uri, length, identifier } = decode(
      player.queue.current.track
    );

    return message.util?.send(
      new MessageEmbed()
        .setColor("BLUE")
        .setThumbnail(`https://i.ytimg.com/vi/${identifier}/hqdefault.jpg`)
        .setTitle(`${Util.escapeMarkdown(title)}`)
        .setURL(uri!)
        .setDescription(
          `\`${this.formatTime(player.position)} ${
            "▬".repeat(Math.floor((player.position / Number(length)) * 20)) +
            "■" +
            "-".repeat(20 - Math.floor((player.position / Number(length)) * 20))
          } ${this.formatTime(Number(length))}\``
        )
    );
  }

  public formatTime(duration: number) {
    const hours = Math.floor((duration / (1e3 * 60 * 60)) % 60),
      minutes = Math.floor(duration / 6e4),
      seconds = ((duration % 6e4) / 1e3).toFixed(0);

    return `${hours ? `${hours.toString().padStart(2, "0")}:` : ""}${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
}
