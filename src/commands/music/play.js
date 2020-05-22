const Utils = require("../../utils/functions");
const { MessageEmbed } = require("discord.js");
const Settings = require("../../models/configsetting.js");

const BlazifyClient = require("../../base/Command");
class Play extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "play",
      description: "Play a Song",
      usage: "b3play Feel Invincible",
      category: "Music",
      cooldown: 1000,
      aliases: ["p", "pplay"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(client, message, args) {
    const guildSettings =
      (await Settings.findOne({ guildID: message.guild.id })) ||
      new Settings({
        guildID: message.guild.id,
      });

    const { enableMusic } = guildSettings;
    if (!enableMusic)
      return message.channel.send(
        "Hmm it seems like the Music commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)"
      );

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music."
      );

    const permissions = voiceChannel.permissionsFor(bot.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send(
        "I cannot connect to your voice channel, make sure I have permission to!"
      );
    if (!permissions.has("SPEAK"))
      return message.channel.send(
        "I cannot speak in your voice channel, make sure I have permission to!"
      );

    if (!args[0])
      return message.channel.send(
        "Please provide a song name or link to search."
      );

    let player = bot.lava.players.get(message.guild.id);
    if (!player) {
      player = await bot.lava.join(
        {
          guild: message.guild.id,
          channel: message.member.voice.channel.id,
        },
        { deaf: true }
      );

      player.textChannel = message.channel;
    }

    const search = `${
      ["https:", "http:"].includes(
        require("url").parse(args.join(" ")).protocol
      )
        ? ""
        : "ytsearch:"
    }${args.join(" ")}`;

    bot.lava
      .search(search)
      .then(async (res) => {
        switch (res.loadType) {
          case "TRACK_LOADED":
            player.add(message.author.id, res.tracks[0].track);
            message.channel.send(
              `Enqueuing \`${res.tracks[0].info.title}\` \`${Utils.formatTime(
                res.tracks[0].info.length,
                true
              )}\``
            );
            if (!player.playing) player.start();
            break;

          case "SEARCH_RESULT":
            let index = 1;
            const tracks = res.tracks.slice(0, 5);
            const embed = new MessageEmbed()
              .setAuthor("Song Selection.", message.author.displayAvatarURL)
              .setDescription(
                tracks.map((video) => `**${index++} -** ${video.info.title}`)
              )
              .setFooter(
                "Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection"
              );

            await message.channel.send(embed);

            const collector = message.channel.createMessageCollector(
              (m) => {
                return (
                  m.author.id === message.author.id &&
                  new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                );
              },
              { time: 30000, max: 1 }
            );

            collector.on("collect", (m) => {
              if (/cancel/i.test(m.content)) return collector.stop("cancelled");

              const track = tracks[Number(m.content) - 1];
              player.add(message.author.id, track.track);
              const loadingEmbed = new MessageEmbed()
                .setTitle("SONG/PLAYLIST IS BEING LOADED")
                .setDescription(
                  `Playing \`${track.info.title}\` \`${Utils.formatTime(
                    track.info.length,
                    true
                  )}\``
                )
                .setColor("#FF0000");
              message.channel.send(loadingEmbed);
              if (!player.playing) player.start();
            });

            collector.on("end", (_, reason) => {
              if (["time", "cancelled"].includes(reason))
                return message.channel.send("Cancelled selection.");
            });
            break;

          case "PLAYLIST_LOADED":
            player.add(message.author.id, ...res.tracks.map((r) => r.track));
            const duration = Utils.formatTime(
              res.playlist.tracks.reduce((acc, cur) => ({
                duration: acc.duration + cur.duration,
              })).duration,
              true
            );
            message.channel.send(
              `Enqueuing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``
            );
            if (!player.playing) player.start();
            break;
        }
      })
      .catch((err) => message.channel.send(err.message));
  }
};
module.exports = Play;