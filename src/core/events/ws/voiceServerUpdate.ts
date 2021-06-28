import { Listener } from "discord-akairo";
import { DiscordVoiceServer } from "lavaclient";

export default class VoiceServerUpdateEvent extends Listener {
  public constructor() {
    super("VOICE_SERVER_UPDATE", {
      emitter: "ws",
      event: "VOICE_SERVER_UPDATE",
    });
  }

  async exec(upd: DiscordVoiceServer) {
    await this.client.lavaclient.serverUpdate(upd);
  }
}
