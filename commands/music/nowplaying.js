const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")

module.exports = {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays what the bot is currently playing.",
        accessableby: "Member",
        category: "music",
    run: async (bot, message, args) => {
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
        if (!player || !player.queue[0]) return message.channel.send("No song/s currently playing within this guild.");
        const { title, author, duration, thumbnail } = player.queue[0];

        const embed = new RichEmbed()
            .setAuthor("Current Song Playing.", message.author.displayAvatarURL)
            .setThumbnail(thumbnail)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **${title}** \`${Utils.formatTime(duration, true)}\` by ${author}
            `);

        return message.channel.send(embed);
    }
  }
}
