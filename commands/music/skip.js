const Settings = require("../../models/configsetting.js");
module.exports = {
        name: "skip",
        aliases: ["next", "sk"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<input>",
    run: (bot, message, args) => {
      let allGuilds = client.guilds.cache.array();
      for (let i = 0; i < allGuilds.length; i++) {
      Settings.findOne(
        { guildID: allGuilds[i].id },
        async (err, settings) => {
          if (err) console.log(err);

          if (!settings) {
            enableMusic = false;
          } else {
            enableMusic = settings.enableMusic
          }
        })
      }
      if(enableMusic === true) {
        const player = bot.music.players.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");

        const { voiceChannel } = message.member;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the skip command.");

        player.stop();
        return message.channel.send("Skipped the current song!");
    }
  }
}
