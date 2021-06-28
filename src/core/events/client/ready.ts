import { Listener } from "discord-akairo";

export default class ReadyEvent extends Listener {
  public constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
    });
  }

  exec() {
    console.log(`${this.client.user?.tag} is ready!`);

    this.client.user?.setActivity({
      name: `over ${this.client.guilds.cache.size} guilds!`,
      type: "WATCHING",
    });

    this.client.guilds.cache.forEach(async (x) => {
      this.client.emit("guildCreate", x);
    });
  }
}
