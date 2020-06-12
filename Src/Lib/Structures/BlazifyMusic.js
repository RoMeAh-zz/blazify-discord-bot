import { Plugin, Structures } from "lavaclient";
import fetch from "node-fetch";
import { decode } from "@lavalink/encoding";
import { formatTime } from "./functions";

class BlazifyMusicPlugin extends Plugin {
  preRegister() {
    Structures.extend(
      "player",
      (player) =>
        class BlazifiedPlayer extends player {
          constructor(...args) {
            super(...args);

            this.next = [];
            this.repeat = false;
            this.current = null;
            this.textChannel = null;

            this.on("end", async (event) => {
              if (event.reason === "REPLACED") return;
              if (event.reason === "LOAD_FAILED")
                this.textChannel.send("Sorry, we had trouble playing a song.");

              if (!this.repeat) this.current = this.next.shift();
              if (!this.current) return this.onFinish();

              await this.play(this.current.song);
              this.onNext();
            });
          }

          add(requester, ...songs) {
            return this.next.push(
              ...songs.map((s) => ({ requester, song: s }))
            );
          }

          async start() {
            if (!this.current) this.current = this.next.shift();
            if (!this.current) return this.onFinish();
            await this.play(this.current.song);
            this.onNext();
          }

          onFinish() {
            this.textChannel.send("The queue has ended! :wave:");
            return this.manager.leave(this.guild);
          }

          onNext() {
            const { title, length } = decode(this.current.song);
            return this.textChannel
              .send(
                `Now playing: **${title}** \`${formatTime(
                  Number(length),
                  true
                )}\``
              )
              .then((m) => m.delete({ timeout: 15000 }));
          }
        }
    );
  }

  register(manager) {
    manager.search = (identifier) => {
      const ideal = manager.ideal[0];
      return fetch(
        `http://${ideal.host}:${ideal.port}/loadtracks?${new URLSearchParams({
          identifier,
        })}`,
        {
          headers: {
            authorization: ideal.password,
          },
        }
      ).then((res) => res.json());
    };
  }
};
export default BlazifyMusicPlugin;