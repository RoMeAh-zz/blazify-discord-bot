const Settings = require("../../models/configsetting.js");
module.exports = {
        name: "skip",
        aliases: ["next", "sk"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<input>",
    run: async (bot, message, args) => {
 const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableMusic} = guildSettings;
if(!enableMusic) return message.channel.send("Hmm it seems like the Music commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
        const player = bot.music.players.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");

          const voiceChannel = message.member.voice.channel
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the skip command.");

        player.stop();
        return message.channel.send("Skipped the current song!");
    }
  }
