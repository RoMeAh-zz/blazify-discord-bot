import { Command } from "discord-akairo";
import { Message } from "discord.js";

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
    const player = this.client.lavaclient.players.get(message.guild?.id!)!;

    return player.queue.emit("finished", "disconnected");
  }
}
