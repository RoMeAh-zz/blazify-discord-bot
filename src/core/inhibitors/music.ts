import { Inhibitor, Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class MusicInhibitor extends Inhibitor {
  public constructor() {
    super("music", {
      reason: "music",
    });
  }

  async exec(message: Message, cmd: Command): Promise<boolean> {
    if (cmd.categoryID === "Music" && cmd.aliases[0] !== "play") {
      const player = this.client.lavaclient.players.get(message.guild?.id!);
      if (!player || (player && !player.queue.current)) {
        await message.util?.send(
          new MessageEmbed().setColor("RED").setDescription("No player found!")
        );
        return true;
      }

      const { channel } = message.member?.voice!;
      if (!channel || player.channel !== message.member?.voice?.channel?.id) {
        await message.util?.send(
          new MessageEmbed()
            .setColor("#f55e53")
            .setDescription("We're in different vc")
        );
        return true;
      }
    }
    return false;
  }
}
