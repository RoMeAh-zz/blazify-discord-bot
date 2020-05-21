const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const fortnite = require("simple-fortnite-api"), client = new fortnite("fd14160a-8e5b-4091-b72d-8b386f7846df");
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class Fortnite extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "fortnite",
      description: "Shows the stats of a fortnite player",
      usage: "b3fortnite player pc|console",
      category: "Gaming",
      cooldown: 1000,
      aliases: ["ft"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(message, args) {
       const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableGaming} = guildSettings;
    if(!enableGaming) return message.channel.send("Hmm it seems like the Gaming commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)");
        if(!args[0]) return message.channel.send("Please supply a username.");
        if(args[1] && !["lifetime", "solo", "duo", "squad"].includes(args[1])) return message.channel.send("Usage: `!fortnite <username> <gametype>`\nGameTypes: Lifetime, Solo, Duo, Squad");
        let gametype = args[1] ? args[1].toLowerCase() : "lifetime";
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
module.exports = Fortnite;