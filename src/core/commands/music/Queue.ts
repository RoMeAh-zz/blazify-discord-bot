import { Command } from "discord-akairo";
import { Message, MessageEmbed, Util } from "discord.js";

import { decode } from "@lavalink/encoding";

export default class extends Command {
  public constructor() {
    super("queue", {
      aliases: ["queue", "q"],
      args: [
        {
          id: "page",
          type: "number",
          default: 1,
        },
      ],
      category: "Music",
      description: "Queue",
      channel: "guild",
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  exec(message: Message, { page }: { page: number }) {
    const player = this.client.lavaclient.players.get(message.guild?.id!)!;

    const { title, uri } = decode(player.queue.current.track);

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("**❯ Queue:**")
      .setAuthor(
        message.guild?.name,
        message.guild?.iconURL({ dynamic: true })!
      )
      .addField("**❯ Current:**", `[${title}](${uri})`);

    if (!player.queue.next.length) return message.util?.send(embed);

    const maxPages = Math.ceil(player.queue.next.length / 10);
    if (page > maxPages || page < 1) page = 1;

    const prev = player.queue.previous.map(
      (data: { track: string | Uint8Array }, index: any) => {
        const { title, uri } = decode(data.track);
        return {
          title:
            title.length > 20
              ? Util.escapeMarkdown(title.substring(0, 40))
              : Util.escapeMarkdown(title),
          uri,
          index,
        };
      }
    );

    const next = player.queue.next.map(
      (data: { track: string | Uint8Array }, index: any) => {
        const { title, uri } = decode(data.track);
        return {
          title:
            title.length > 20
              ? Util.escapeMarkdown(title.substring(0, 40))
              : Util.escapeMarkdown(title),
          uri,
          index,
        };
      }
    );

    return message.util?.send(
      embed
        .setDescription(
          `
          **❯ Previously played:**\n
          ${prev
            .slice((page - 1) * 5, page * 5)
            .map(
              (data: { index: number; title: string; uri: string | null }) =>
                `**${data.index + 1}.** [${data.title}](${data.uri})`
            )
            .join("\n")}
          **❯ Next to be played:**\n
          ${next
            .slice((page - 1) * 5, page * 5)
            .map(
              (data: { index: number; title: string; uri: string | null }) =>
                `**${data.index + 1}.** [${data.title}](${data.uri})`
            )
            .join("\n")}
          `
        )
        .setFooter(`Page: ${page} / ${maxPages}`)
    );
  }
}
