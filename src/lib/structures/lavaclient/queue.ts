import { Message, MessageEmbed } from "discord.js";
import { decode } from "@lavalink/encoding";
import { EventEmitter } from "events";
import { Player } from "lavaclient";

interface QueueObject {
  track: string;
  requester: string;
}

interface RepeatObject {
  song: boolean;
  queue: boolean;
}

export class Queue extends EventEmitter {
  public next: QueueObject[] = [];
  public previous: QueueObject[] = [];
  public current: QueueObject;
  public repeat: RepeatObject = { song: false, queue: false };

  private message: Message;

  public constructor(public player: Player) {
    super();

    player
      .on("end", async (event) => {
        if (event && ["REPLACED", "STOPPED"].includes(event.reason)) return;

        if (this.repeat.song) this.next.unshift(this.current);
        else if (this.repeat.queue) this.previous.push(this.current);

        if (this.message.guild?.me?.voice?.channel?.members.size === 1)
          return this.emit("finished", "alone");

        this._next();

        if (!this.current) return this.emit("finished", "empty");
        return player.play(this.current.track);
      })
      .on("start", (evt) => {
        if (!evt) return;

        const { title, identifier, uri, author } = decode(evt.track);

        this.message.channel.send(
          new MessageEmbed()
            .setColor("GREEN")
            .setThumbnail(`https://i.ytimg.com/vi/${identifier}/hqdefault.jpg`)
            .setDescription(`${author}\n\n[${title}](${uri})`)
        );
      })
      .on("stuck", () => {
        this.message.channel.send(
          new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(
              "Un oh, something went wrong... Just a second please."
            )
        );
      })
      .on("error", (error) => {
        this.message.channel.send(
          new MessageEmbed()
            .setColor("#f55e53")
            .setDescription(
              `Unexpected Error! Please report it to our [report centere](https://discord.gg/9bnpjqY})\n\`\`\`js\n${JSON.stringify(
                error,
                null,
                4
              )}\`\`\``
            )
        );
      });

    this.on("finished", async (reason: string) => {
      if (this.repeat.queue) {
        this.next.push(...this.previous);
        this.previous = [];
        if (reason != "disconnected") return this.start(this.message);
      }

      switch (reason) {
        case "empty":
        default:
          this.message.channel.send(
            new MessageEmbed()
              .setColor("BLUE")
              .setDescription(
                "Queue finished! I am leaving the voice channel..."
              )
          );

          return await this.clear();

        case "alone":
          this.message.channel.send(
            new MessageEmbed()
              .setColor("BLUE")
              .setDescription("I was alone in the voice channel so i left...")
          );

          return await this.clear();

        case "disconnected":
          this.message.channel.send(
            new MessageEmbed()
              .setColor("BLUE")
              .setDescription("Disconnected my player!")
          );

          return await this.clear();
      }
    });
  }

  public shuffle() {
    for (let i = 0; i < this.next.length - 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.next[i], this.next[j]] = [this.next[j], this.next[i]];
    }
    return this.next;
  }

  public loop(type: "queue" | "song") {
    this.repeat[type] = !this.repeat[type];
    this.repeat[type === "queue" ? "song" : "queue"] = false;

    if (Object.values(this.repeat).some((val) => !val))
      this.player.repeating = "nothing";
    else this.player.repeating = type;

    return this.repeat;
  }

  public _next() {
    return (this.current = this.next.shift()!);
  }

  public add(track: string, requester: string) {
    return this.next.push({ track, requester });
  }

  public async clear() {
    this.next = [];
    this.previous = [];
    this.repeat = { song: false, queue: false };

    return await this.player.manager.destroy(
      this.message.guild?.id ?? this.player.guild
    );
  }

  public start(message: Message) {
    this.message = message;
    if (!this.current) this._next();
    this.player.play(this.current.track);
  }
}
