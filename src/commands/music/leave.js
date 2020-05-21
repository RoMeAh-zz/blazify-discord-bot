const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class Leave extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "leave",
      description: "Stop a Song",
      usage: "b3leave",
      category: "Music",
      cooldown: 1000,
      aliases: ["stop"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(message, args) {
    const guildSettings =
      (await Settings.findOne({ guildID: message.guild.id })) ||
      new Settings({
        guildID: message.guild.id,
      });

    const { enableMusic } = guildSettings;
    if (!enableMusic)
      return message.channel.send(
        "Hmm it seems like the Music commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)"
      );

    const voiceChannel = message.member.voice.channel;
    const player = bot.lava.players.get(message.guild.id);

    if (!player)
      return message.channel.send("No song/s currently playing in this guild.");
    if (!voiceChannel || voiceChannel.id !== player.channel)
      return message.channel.send(
        "You need to be in a voice channel to use the leave command."
      );

    bot.lava.leave(player.guild);
    return message.channel.send("Successfully stopped the music.");
  }
};
module.exports = Leave;