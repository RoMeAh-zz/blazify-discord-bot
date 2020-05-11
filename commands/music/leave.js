const Settings = require("../../models/configsetting.js");
module.exports = {
        name: "leave",
        aliases: ["lev", "stop"],
        description: "Makes the bot leave the voice channel.",
        accessableby: "Member",
        category: "music",
    run: async (bot, message, args) => {
 const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableMusic} = guildSettings;
if(!enableMusic) return message.channel.send("Hmm it seems like the Music commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
      const voiceChannel = message.member.voice.channel
        const player = bot.music.players.get(message.guild.id);

        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the leave command.");

        bot.music.players.destroy(message.guild.id);
        return message.channel.send("Successfully stopped the music.")
    }
}
