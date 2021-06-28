import { Listener } from "discord-akairo";
import { Socket } from "lavaclient";

export default class SocketDisconnectEvent extends Listener {
  public constructor() {
    super("socketDisconnect", {
      emitter: "lavaclient",
      event: "socketDisconnect",
    });
  }

  exec({ id, host, port }: Socket, tries: number) {
    console.log(
      `Socket was disconnected at ${host}:${port} with ID of ${id} after ${tries} retries.`
    );
  }
}
