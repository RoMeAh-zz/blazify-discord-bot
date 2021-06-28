import { Listener } from "discord-akairo";
import { DiscordVoiceState } from "lavaclient";

export default class VoiceStateUpdateEvent extends Listener {
  public constructor() {
    super("VOICE_STATE_UPDATE", {
      emitter: "ws",
      event: "VOICE_STATE_UPDATE",
    });
  }

  async exec(upd: DiscordVoiceState) {
    await this.client.lavaclient.stateUpdate(upd);
  }
}
