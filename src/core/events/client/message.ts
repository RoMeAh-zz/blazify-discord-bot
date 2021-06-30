import { Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class ReadyEvent extends Listener {
  public constructor() {
    super("message", {
      emitter: "client",
      event: "message",
    });
  }

  async exec(message: Message) {
    if (message.author.bot) return;
    let entity = await message.member?.entity();
    if (entity && entity.lastUpdatedAt - Date.now() <= 3e4) {
      let xp = Math.floor(Math.random() * 10 + 1);
      entity.xp += xp;
      let nextLevel = entity.level * entity.level * 300;
      if (nextLevel <= entity.xp) {
        entity.level += 1;
        message.util?.send(`<@${message.author.id}> has hit ${entity.level}!`);
      }

      entity.lastUpdatedAt = Date.now();
      await entity.save();
    }
  }
}
