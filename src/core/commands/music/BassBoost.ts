import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

const gains: Record<string, number> = {
  hard: 0.12,
  medium: 0.07,
  low: 0.04,
  none: 0,
};
const levels = ["hard", "medium", "low", "none"];

export default class extends Command {
  public constructor() {
    super("bassboost", {
      aliases: ["bassboost", "bb"],
      args: [
        {
          id: "level",
          type: "string",
        },
      ],
      category: "Music",
      description: "Bassboosting of music",
      channel: "guild",
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  async exec(message: Message, { level }: { level: string }) {
    const player = this.client.lavaclient.players.get(message.guild?.id!);
    if (!player || (player && !player.queue.current))
      return message.util?.send(
        new MessageEmbed().setColor("RED").setDescription("No player found!")
      );

    const { channel } = message.member?.voice!;
    if (!channel || player.channel !== message.member?.voice?.channel?.id)
      return message.util?.send(
        new MessageEmbed()
          .setColor("#f55e53")
          .setDescription("We're in different vc")
      );

    if (!level)
      return message.util?.send(
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`Current Bass level is ${player.bass}`)
      );

    if (!levels.includes(level.toLowerCase()))
      return message.util?.send(
        new MessageEmbed()
          .setColor("#f55e53")
          .setDescription(
            `**${level}** is a invalid level. The valid levels are:\n **${levels.join(
              ", "
            )}**`
          )
      );

    await player.setEqualizer(
      Array(6)
        .fill(null)
        .map((_, i) => ({ band: i++, gain: gains[level.toLowerCase()] }))
    );

    player.bass = level.toLowerCase();

    return message.util?.send(
      new MessageEmbed()
        .setColor("#7289DA")
        .setDescription(`Bass has been set to ${level}`)
    );
  }
}
