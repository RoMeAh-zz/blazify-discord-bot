import { Listener } from "discord-akairo";
import { Guild } from "discord.js";

export default class GuildCreateEvent extends Listener {
  public constructor() {
    super("guildCreate", {
      emitter: "client",
      event: "guildCreate",
    });
  }

  async exec(guild: Guild) {
    await guild.initDB();

    guild.members.cache.forEach(async (member) => {
      member.initDB();
    });
  }
}
