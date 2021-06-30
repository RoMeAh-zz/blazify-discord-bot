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
    const player = this.client.lavaclient.players.get(message.guild?.id!)!;

    player.emit("end");

    return message.util?.send(
      new MessageEmbed()
        .setColor("GREEN")
        .setDescription("Skipped to the next track!")
    );
  }
}
