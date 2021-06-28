import { Listener } from "discord-akairo";
import { GuildMember } from "discord.js";

export default class GuildMemberJoinEvent extends Listener {
  public constructor() {
    super("guildMemberAdd", {
      emitter: "client",
      event: "guildMemberAdd",
    });
  }

  async exec(member: GuildMember) {
    await member.initDB();
  }
}
