import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class ResumeCommand extends Command {
  public constructor() {
    super("resume", {
      aliases: ["resume", "result"],
      description: "Resumes paused music",
      channel: "guild",
      category: "Music",
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  exec(message: Message) {
    const player = this.client.lavaclient.players.get(message.guild?.id!)!;

    if (!player.paused)
      return message.util?.send(
        new MessageEmbed().setColor("RED").setDescription("Player not paused")
      );

    player.resume();

    return message.util?.send(
      new MessageEmbed().setColor("GREEN").setDescription("Resumed the Player")
    );
  }
}
