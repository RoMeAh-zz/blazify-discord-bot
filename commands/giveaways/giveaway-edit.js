const Discord = require("discord.js");
const client = new Discord.Client();
const Settings = require("../../models/configsetting.js");
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
        name: "giveaway-edit",
        aliases: ["ge"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<input>",
        run: async (client, message, args) => {
          const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
            guildID: message.guild.id
        });
        const {enableGiveaway} = guildSettings;
    if(enableGiveaway) {
      const ms = require("ms"); // npm install mss
      // g!start-giveaway 2d 1 Awesome prize!
            // will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"
          if(!args[1])return message.channel.send("```Uh-Oh, its b3giveaway-edit <messageID> <time> <winners> <prize>```")
          if(!args[2])return message.channel.send("```Uh-Oh, its b3giveaway-edit <messageID> <time> <winners> <prize>```")
          if(!args[3])return message.channel.send("```Uh-Oh, its b3giveaway-edit <messageID> <time> <winners> <prize>```")
          if(!args[4])return message.channel.send("```Uh-Oh, its b3giveaway-edit <messageID> <time> <winners> <prize>```")
          let messageID = args[0];
         client.giveawaysManager.edit(messageID, {
             newWinnerCount: parseInt(args[2]),
             newPrize: args.slice(3).join(" "),
             addTime: ms(args[1]),
         }).then(() => {
             message.channel.send("<a:grxz:695226497115619408><a:grxz:695226497115619408> Success! Giveaway will updated in less than 3 seconds.<a:grxz:695226497115619408><a:grxz:695226497115619408> ");
         }).catch((err) => {
             message.channel.send("No giveaway found for "+messageID+", please check and try again");
         });
        }
}
}
let allGiveaways = client.giveawaysManager.giveaways; // [ {Giveaway}, {Giveaway} ]

    // The list of all the giveaways on the server with ID "1909282092"
    let onServer = client.giveawaysManager.giveaways.filter((g) => g.guildID === "1909282092");

    // The list of the current giveaways (not ended)
    let notEnded = client.giveawaysManager.giveaways.filter((g) => !g.ended);
