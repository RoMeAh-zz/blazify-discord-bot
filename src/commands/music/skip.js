const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class Skip extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "skip",
      description: "Skips a Song",
      usage: "b3skip",
      category: "music",
      cooldown: 1000,
      aliases: ["sk"],
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
    if (!player)
      return message.channel.send("No song/s currently playing in this guild.");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel || voiceChannel.id !== player.channel)
      return message.channel.send(
        "You need to be in a voice channel to use the skip command."
      );

    player.stop();
    return message.channel.send("Skipped the current song!");
  }
};
module.exports = Skip;