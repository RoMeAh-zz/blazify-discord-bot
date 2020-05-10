const Settings = require("../../models/configsetting.js");
module.exports = {
    name: "afk",
    aliases: ["away"],
    category: "moderation",
    description: "Sets the AFK Status of a user",
    run: async (client, message, args) => {
 const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableUtility} = guildSettings;
if(!enableUtility) return message.channel.send("Hmm it seems like the Utility commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");

          let reason = args.join(" ") ? args.join(" ") : "AFKING";
          let afks = client.afk.get(message.author.id);

          if (!afks) {
              let data = {
                  id: message.author.id,
                  reason: reason
              };

              client.afk.set(message.author.id, data);
              return message.channel.send(`You are now afk. Reason: ${reason}`)
          }
      }
    }
