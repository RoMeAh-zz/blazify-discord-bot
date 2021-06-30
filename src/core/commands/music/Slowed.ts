import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class SlowedCommand extends Command {
  public constructor() {
    super("slowed", {
      aliases: ["slowed"],
      description: "Slowed filter",
      category: "Music",
      channel: "guild",
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  exec(message: Message) {
    const player = this.client.lavaclient.players.get(message.guild?.id!)!;

    if (player.playerFilter === "slowed") {
      player.send("filters", {});

      player.playerFilter = "default";

      return message.util?.send(
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription("Slowed filter turned off")
      );
    }

    player.send("filters", {
      equalizer: [
        { band: 1, gain: 0.3 },
        { band: 0, gain: 0.3 },
      ],
      timescale: { pitch: 1.1, rate: 0.8 },
      tremolo: { depth: 0.3, frequency: 14 },
    });

    player.playerFilter = "slowed";

    return message.util?.send(
      new MessageEmbed()
        .setColor("GREEN")
        .setDescription("Slowed filter activated")
    );
  }
}
