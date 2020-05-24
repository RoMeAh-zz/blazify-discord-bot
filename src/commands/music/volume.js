const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class Volume extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "volume",
      description: "Adjusts the volume of music",
      usage: "b3volume 20",
      category: "music",
      cooldown: 1000,
      aliases: ["v", "vol"],
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
      return message.channel.send(
        "No song/s currently playing within this guild."
      );

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id)
      return message.channel.send(
        "You need to be in a voice channel to adjust the volume."
      );

    if (!args[0])
      return message.channel.send(`Current Volume: ${player.volume}`);
    if (Number(args[0]) <= 0 || Number(args[0]) > 100)
      return message.channel.send("You may only set the volume to 1-100");

    player.setVolume(Number(args[0]));
    return message.channel.send(`Successfully set the volume to: ${args[0]}`);
  }
};
module.exports = Volume;