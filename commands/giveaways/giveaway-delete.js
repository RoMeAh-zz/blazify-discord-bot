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
    run: (bot, message, args) => {
      const ms = require("ms"); // npm install ms
      const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
      // g!start-giveaway 2d 1 Awesome prize!
            // will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"
            let messageID = args[0];
        client.giveawaysManager.delete(messageID).then(() => {
            message.channel.send("<a:grxz:695226497115619408><a:grxz:695226497115619408> Success! Giveaway deleted!<a:grxz:695226497115619408><a:grxz:695226497115619408> ");
        }).catch((err) => {
            message.channel.send("No giveaway found for "+messageID+", please check and try again");
        });
    }

};
let allGiveaways = client.giveawaysManager.giveaways; // [ {Giveaway}, {Giveaway} ]

    // The list of all the giveaways on the server with ID "1909282092"
    let onServer = client.giveawaysManager.giveaways.filter((g) => g.guildID === "1909282092");

    // The list of the current giveaways (not ended)
    let notEnded = client.giveawaysManager.giveaways.filter((g) => !g.ended);
