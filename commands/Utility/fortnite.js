const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const fortnite = require("simple-fortnite-api"), client = new fortnite("fd14160a-8e5b-4091-b72d-8b386f7846df");

module.exports = {
        name: "fortnite",
        description: "Displays a user's fortnite stats!",
        usage: "<user> <platform>",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["ftn"],
    run: async (bot, message, args) => {
        if(!args[0]) return message.channel.send("Please supply a username.");
        if(args[1] && !["lifetime", "solo", "duo", "squad"].includes(args[1])) return message.channel.send("Usage: `!fortnite <username> <gametype>`\nGameTypes: Lifetime, Solo, Duo, Squad");
        let gametype = args[1] ? args[1].toLowerCase() : "lifetime";
        let allGuilds = client.guilds.cache.array();
        for (let i = 0; i < allGuilds.length; i++) {
        Settings.findOne(
          { guildID: allGuilds[i].id },
          async (err, settings) => {
            if (err) console.log(err);

            if (!settings) {
              enableCaptcha = false;
            } else {
              enableCaptcha = settings.enableCaptcha
            }
          })
        }
        let data = await client.find(args[0])
        if(data && data.code === 404) return message.channel.send("Unable to find a user with that username.")
            const { image, url, username } = data;
            const { scorePerMin, winPercent, kills, score, wins, kd, matches } = data[gametype]

                const embed = new MessageEmbed()
                    .setColor(cyan)
                    .setAuthor(`Epic Games (Fortnite) | ${username}`, image)
                    .setThumbnail(image)
                    .setDescription(stripIndents`**Gamemode:** ${gametype.slice(0, 1).toUpperCase() + gametype.slice(1)}
                    **Kills:** ${kills || 0}
                    **Score:** ${score || 0}
                    **Score Per Min:** ${scorePerMin || 0}
                    **Wins:** ${wins || 0}
                    **Win Ratio:** ${winPercent || "0%"}
                    **Kill/Death Ratio:** ${kd || 0}
                    **Matches Played:** ${matches || 0}
                    **Link:** [link to profile](${url})`)
                    .setTimestamp()

                    message.channel.send(embed)
    }
}
