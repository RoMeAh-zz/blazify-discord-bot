import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class extends Command {
  public constructor() {
    super("disconnect", {
      aliases: ["disconnect", "leave"],
      description: "Disconnect bot from Voice Channel",
      channel: "guild",
      category: "Music",
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  async exec(message: Message) {
    const player = this.client.lavaclient.players.get(message.guild?.id!);
    if (!player || (player && !player.queue.current))
      return message.util?.send(
        new MessageEmbed().setColor("RED").setDescription("No Player found!")
      );

    const { channel } = message.member?.voice!;
    if (!channel || player.channel !== channel.id)
      return message.util?.send(
        new MessageEmbed()
          .setColor("YELLOW")
          .setDescription("We're in two different voice channels!")
      );

    return player.queue.emit("finished", "disconnected");
  }
}
