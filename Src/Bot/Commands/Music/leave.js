const Settings = require("../../../Lib/Database/models/configsetting.js");
const BlazifyClient = require("../../../Lib/Base/Command");
class Leave extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "leave",
      description: "Stop a Song",
      usage: "b3leave",
      category: "music",
      cooldown: 1000,
      aliases: ["stop"],
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
    const player = client.lava.players.get(message.guild.id);

    if (!player)
      return message.channel.send("No song/s currently playing in this guild.");
    if (!voiceChannel || voiceChannel.id !== player.channel)
      return message.channel.send(
        "You need to be in a voice channel to use the leave command."
      );

    client.lava.leave(player.guild);
    return message.channel.send("Successfully stopped the music.");
  }
};
module.exports = Leave;