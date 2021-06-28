import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class extends Command {
  public constructor() {
    super("skip", {
      aliases: ["skip", "next"],
      description: "Skips to the next song",
      channel: "guild",
      category: "Music",
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  exec(message: Message) {
    const player = this.client.lavaclient.players.get(message.guild?.id!);
    if (!player || (player && !player.queue.current))
      return message.util?.send(
        new MessageEmbed().setColor("RED").setDescription("No player present")
      );

    const { channel } = message.member?.voice!;
    if (!channel || player.channel !== message.member?.voice?.channel?.id)
      return message.util?.send(
        new MessageEmbed()
          .setColor("YELLOW")
          .setDescription("We're present in two different Voice Channels")
      );

    player.emit("end");

    return message.util?.send(
      new MessageEmbed()
        .setColor("GREEN")
        .setDescription("Skipped to the next track!")
    );
  }
}
