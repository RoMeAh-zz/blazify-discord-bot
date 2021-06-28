import { Message, MessageEmbed } from "discord.js";
import { Rest } from "../../../lib/structures/lavaclient/rest";
import { Command } from "discord-akairo";

export default class extends Command {
  public constructor() {
    super("play", {
      aliases: ["play", "p"],
      args: [
        {
          id: "song",
          match: "rest",
          prompt: {
            start: "Enter a song name or link",
          },
        },

        {
          id: "type",
          match: "option",
          type: ["spotify", "youtube"],
          flag: ["--type=", "-type=", "--t=", "-t="],
          default: "youtube",
        },
      ],
      category: "Music",
      description: "Plays music",
      channel: "guild",
      userPermissions: ["SEND_MESSAGES"],
      clientPermissions: ["CONNECT", "SPEAK"],
    });
  }

  public async exec(
    message: Message,
    { song, type }: { song: string; type: string }
  ): Promise<Message | undefined> {
    const channel = message.member?.voice?.channel;
    if (!channel) {
      return message.util?.send(
        new MessageEmbed()
          .setColor("RED")
          .setDescription("You aren't present in any voice channel!")
      );
      return;
    }

    let player = this.client.lavaclient.players.get(message.guild?.id!)!;
    if (player && (!player.queue || !player.queue.current))
      await this.client.lavaclient.destroy(player.guild ?? message.guild?.id!);

    if (player && player.channel !== channel.id) {
      return message.util?.send(
        new MessageEmbed()
          .setColor("RED")
          .setDescription("You are present in a different Voice Channel")
      );
      return;
    }

    if (!player) {
      player = this.client.lavaclient.create(message.guild!);
    }

    const { loadType, tracks, playlistInfo, exception } = await Rest.resolve(
      song.includes("https://")
        ? encodeURI(song)
        : `${type == "youtube" ? "ytsearch:" : "scsearch:"}${encodeURIComponent(
            song
          )}`
    );

    if (exception) {
      await this.client.lavaclient.destroy(player.guild);

      return message.util?.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Music Search Error!")
          .setDescription(exception.message)
      );
    }

    switch (loadType) {
      case "LOAD_FAILED":
      case "NO_MATCHES":
        return message.util?.send(
          new MessageEmbed()
            .setColor("#f55e53")
            .setDescription(
              `No result found for \`${song.substring(0, 60)}\`...`
            )
        );

      case "TRACK_LOADED":
        player.queue.add(tracks[0].track, message.author.id);

        message.util?.send(
          new MessageEmbed()
            .setColor("GREEN")
            .setThumbnail(
              `https://i.ytimg.com/vi/${tracks[0].info.identifier}/hqdefault.jpg`
            )
            .setDescription(
              `**Loaded Track ${tracks[0].info.title}**: ${tracks[0].info.uri}`
            )
        );

        if (!player.connected) player.connect(channel.id, { selfDeaf: true });

        if (!player.paused && !player.playing)
          await player.queue.start(message);
        break;

      case "PLAYLIST_LOADED":
        tracks.forEach((track) =>
          player.queue.add(track.track, message.author.id)
        );

        message.util?.send(
          new MessageEmbed()
            .setColor("GREEN")
            .setThumbnail(
              `https://i.ytimg.com/vi/${tracks[0].info.identifier}/hqdefault.jpg`
            )
            .setDescription(
              `Added **${playlistInfo?.name}** playlist with ${tracks.length} tracks`
            )
        );

        if (!player.connected)
          await player.connect(channel.id, { selfDeaf: true });

        if (!player.paused && !player.playing)
          await player.queue.start(message);
        break;
      case "SEARCH_RESULT":
        const songs = tracks.slice(0, 5);

        const msg = await message.util?.send(
          new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
              songs
                .map(
                  (track, index) =>
                    `**${index + 1}.** [${track.info.title}](${track.info.uri})`
                )
                .join("\n")
            )
        );

        const filter = (m: Message) => m.author.id === message.author.id;

        msg?.channel
          .awaitMessages(filter, { time: 15e3, max: 1, errors: ["time"] })
          .then(async (collected) => {
            const first = collected.first();

            if (first?.content.toLowerCase() === "cancel") {
              return message.util?.send(
                new MessageEmbed()
                  .setColor("BLUE")
                  .setDescription("Cancelled selection")
              );
            }

            if (Number(first?.content) > 5 || Number(first?.content) < 1) {
              return message.util?.send(
                new MessageEmbed()
                  .setColor("RED")
                  .setDescription("Invalid selection")
              );
            }

            if (first?.deletable) await first.delete();

            const track = tracks[Number(first?.content) - 1];

            player.queue.add(track.track, message.author.id);

            message.util?.send(
              new MessageEmbed()
                .setColor("GREEN")
                .setThumbnail(
                  `https://i.ytimg.com/vi/${track.info.identifier}/hqdefault.jpg`
                )
                .setDescription(
                  `**Loaded Track ${track.info.title}**: ${track.info.uri}`
                )
            );

            if (!player.connected)
              await player.connect(channel.id, { selfDeaf: true });

            if (!player.paused && !player.playing)
              await player.queue.start(message);
            return;
          })
          .catch(() => {
            message.util?.send(
              new MessageEmbed()
                .setColor("YELLOW")
                .setDescription("Song selection timeout!")
            );
          });
        break;
    }
    return;
  }
}
