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
        name: "giveaway-start",
        aliases: ["gc", "gs"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<input>",
    run: (bot, message, args) => {
      const ms = require("ms"); // npm install ms
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    if(!args[0])return message.channel.send("```Uh-Oh, its b3giveaway-start <time> <winners> <prize>```")
     if(!args[1])return message.channel.send("```Uh-Oh, its b3giveaway-start <time> <winners> <prize>```")
     if(!args[2])return message.channel.send("```Uh-Oh, its b3giveaway-start <time> <winners> <prize>```")
       client.giveawaysManager.start(message.channel, {
   time: ms(args[0]),
   prize: args.slice(2).join(" "),
   winnerCount: parseInt(args[1]),
   messages: {
       giveaway: "\n\n🎉🎉 **GIVEAWAY** 🎉🎉",
       giveawayEnded: "\n\n🎉🎉**GIVEAWAY ENDED** 🎉🎉",
       timeRemaining: "Time remaining: **{duration}**!",
       inviteToParticipate: "React with 🎉to participate!",
       winMessage: `🎉🎉Congratulations, {winners}! You won **{prize}** CLAIM FROM @${message.author.tag}!🎉🎉`,
       embedFooter: "Giveaways",
       noWinner: "Giveaway cancelled, no valid participations.",
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
