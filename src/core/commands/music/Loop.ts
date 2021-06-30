import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class LoopCommand extends Command {
  public constructor() {
    super("loop", {
      aliases: ["loop", "repeat"],
      args: [
        {
          id: "type",
          type: "string",
        },
      ],
      description: "Repeats a track or queue",
      channel: "guild",
      category: "Music",
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  exec(message: Message, { type }: { type: string }) {
    const player = this.client.lavaclient.players.get(message.guild?.id!)!;

    if (!type)
      return message.util?.send(
        new MessageEmbed()
          .setColor("YELLOW")
          .setDescription("Nothing provided to loop over!")
      );

    if (!["queue", "song"].includes(type.toLowerCase()))
      return message.util?.send(
        new MessageEmbed()
          .setColor("YELLOW")
          .setDescription(
            `Expected ${["song", "queue"]
              .map((type) => `\`${type}\``)
              .join(", ")}`
          )
      );

    player.queue.loop(type.toLowerCase() as any);

    return message.util?.send(
      new MessageEmbed()
        .setColor("#7289DA")
        .setDescription(
          `Looping ${
            player.queue.repeat[
              type.toLowerCase() as unknown as keyof typeof player.queue.repeat
            ]
              ? "started"
              : "stopped"
          }...`
        )
    );
  }
}
