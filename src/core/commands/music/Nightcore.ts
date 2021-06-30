import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class NightcoreCommand extends Command {
  public constructor() {
    super("nightcore", {
      aliases: ["nightcore", "nc"],
      description: "Enables/disables nightcore filter",
      channel: "guild",
      category: "Music",
      userPermissions: ["SEND_MESSAGES"],
    });
  }

  exec(message: Message) {
    const player = this.client.lavaclient.players.get(message.guild?.id!)!;

    if (player.playerFilter === "nightcore") {
      player.send("filters", {});

      player.playerFilter = "default";

      return message.util?.send(
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription("Turned off nightcore filter")
      );
    }

    player.send("filters", {
      equalizer: [
        { band: 1, gain: 0.3 },
        { band: 0, gain: 0.3 },
      ],
      timescale: { pitch: 1.2 },
      tremolo: { depth: 0.3, frequency: 14 },
    });

    player.playerFilter = "nightcore";

    return message.util?.send(
      new MessageEmbed()
        .setColor("GREEN")
        .setDescription("Turned on nightcore filter")
    );
  }
}
