const Discord = require("discord.js");
const client = new Discord.Client();
// Requires Manager from discord-giveaways
const { GiveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

module.exports = {
        name: "role-giveaway-start",
        aliases: ["rgc", "rgs"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<input>",
        run: (client, message, args) => {
      const ms = require("ms"); // npm install ms
      // g!start-giveaway 2d 1 Awesome prize!
            // will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"
          if(!args[1])return message.channel.send("```Uh-Oh, its b3role-giveaway-start <@role> <time> <winners> <prize>```")
          if(!args[2])return message.channel.send("```Uh-Oh, its b3role-giveaway-start <@role> <time> <winners> <prize>```")
          if(!args[3])return message.channel.send("```Uh-Oh, its b3role-giveaway-start <@role> <time> <winners> <prize>```")
        let role = message.mentions.roles.first(); ///move this up
           if (!role) return message.channel.send("Error, that role doesn't exist or you didn't mention a role") ///move this down
            client.giveawaysManager.start(message.channel, {
        time: ms(args[1]),
        prize: args.slice(3).join(" "),
        winnerCount: parseInt(args[2]),
        exemptMembers: (member) => !member.roles.some(r => r.name === role.name),
        messages: {
            giveaway: "\n\n🎉🎉>  **GIVEAWAY** 🎉🎉 ",
            giveawayEnded: "🎉🎉**GIVEAWAY ENDED**🎉🎉 ",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: `🎉🎉Congratulations, {winners}! You won **{prize}** CLAIM FROM @${message.author.tag}!🎉🎉`,
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            embedColor: "#FF0000",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
        })
    }
}
let allGiveaways = client.giveawaysManager.giveaways; // [ {Giveaway}, {Giveaway} ]

    // The list of all the giveaways on the server with ID "1909282092"
    let onServer = client.giveawaysManager.giveaways.filter((g) => g.guildID === "1909282092");

    // The list of the current giveaways (not ended)
    let notEnded = client.giveawaysManager.giveaways.filter((g) => !g.ended);
