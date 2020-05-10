const Discord = require("discord.js");
const client = new Discord.Client();
// We now have a giveawaysManager property to access the manager everywhere!
const Settings = require("../../models/configsetting.js");

module.exports = {
        name: "giveaway-start",
        aliases: ["gc", "gs"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<input>",
        run: async (client, message, args) => {
          const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
            guildID: message.guild.id
        });
        const {enableGiveaway} = guildSettings;
    if(!enableGiveaway) return message.channel.send("Hmm it seems like the giveaway commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
      const ms = require("ms"); // npm install ms
    if(!args[0])return message.channel.send("```Uh-Oh, its b3giveaway-start <time> <winners> <prize>```")
     if(!args[1])return message.channel.send("```Uh-Oh, its b3giveaway-start <time> <winners> <prize>```")
     if(!args[2])return message.channel.send("```Uh-Oh, its b3giveaway-start <time> <winners> <prize>```")
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
     client.giveawaysManager = manager;
       client.giveawaysManager.start(message.channel, {
   time: ms(args[0]),
   prize: args.slice(2).join(" "),
   winnerCount: parseInt(args[1]),
   messages: {
       giveaway: "\n\n<a:grxz:695226497115619408><a:grxz:695226497115619408> **GIVEAWAY** <a:grxz:695226497115619408><a:grxz:695226497115619408>",
       giveawayEnded: "\n\n<a:grxz:695226497115619408><a:grxz:695226497115619408>**GIVEAWAY ENDED** <a:grxz:695226497115619408><a:grxz:695226497115619408>",
       timeRemaining: "Time remaining: **{duration}**!",
       inviteToParticipate: "React with 🎉to participate!",
       winMessage: `<a:grxz:695226497115619408><a:grxz:695226497115619408>Congratulations, {winners}! You won **{prize}** CLAIM FROM @${message.author.tag}!<a:grxz:695226497115619408><a:grxz:695226497115619408>`,
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
 let allGiveaways = client.giveawaysManager.giveaways; // [ {Giveaway}, {Giveaway} ]

     // The list of all the giveaways on the server with ID "1909282092"
     let onServer = client.giveawaysManager.giveaways.filter((g) => g.guildID === "1909282092");

     // The list of the current giveaways (not ended)
     let notEnded = client.giveawaysManager.giveaways.filter((g) => !g.ended);
    }
}
