const Utils = require("../../utils/functions");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const Settings = require("../../models/configsetting.js");
const { decode } = require("@lavalink/encoding");

const BlazifyClient = require("../../base/Command");
class NP extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      description: "Tells which song is being played in the server.",
      usage: "b3nowplaying",
      category: "Music",
      cooldown: 1000,
      aliases: ["np"],
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

    const player = client.lava.players.get(message.guild.id);
    if (!player || !player.track)
      return message.channel.send(
        "No song/s currently playing within this guild."
      );

    const { title, author, length, uri, identifier } = decode(player.current.song);

    const embed = new MessageEmbed()
      .setAuthor("Current Song Playing.", message.author.displayAvatarURL)
      .setThumbnail(`https://i.ytimg.com/vi/${identifier}/maxresdefault.jpg`)
      .setDescription(stripIndents`
            ${
              player.playing ? "▶️" : "⏸️"
            } **[${title}](${uri})** \`${Utils.formatTime(
      Number(length),
      true
    )}\` by ${author}
            `);

    return message.channel.send(embed);
  }
};
module.exports = NP;