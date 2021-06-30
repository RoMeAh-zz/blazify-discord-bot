import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class VolumeCommand extends Command {
  public constructor() {
    super("volume", {
      aliases: ["volume", "vol"],
      args: [
        {
          id: "amount",
          type: "number",
        },
      ],
      category: "Music",
      description: "Adjusts volume of player",
      channel: "guild",
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  async exec(message: Message, { amount }: { amount: number }) {
    const player = this.client.lavaclient.players.get(message.guild?.id!)!;

    if (!amount) {
      return message.util?.send(
        new MessageEmbed()
          .setColor("RED")
          .setDescription(`The volume is ${player.volume}`)
      );
    }

    if (isNaN(amount) || amount > 200 || amount < 1)
      return message.util?.send(
        new MessageEmbed()
          .setColor("RED")
          .setDescription("Volume should be between 0 and 201")
      );

    player.setVolume(Number(amount));

    return message.util?.send(
      new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`Set volume to ${amount}`)
    );
  }
}
