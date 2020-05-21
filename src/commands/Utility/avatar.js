const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class Avatar extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "Avatar",
      description: "Shows the Avatar of a user",
      usage: "b3avatar @moo",
      category: "Utility",
      cooldown: 1000,
      aliases: ["av", "logo", "pfp"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(message, args) {
 const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableUtility} = guildSettings;
if(!enableUtility) return message.channel.send("Hmm it seems like the Utility commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)");
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayavatarURL}`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });

        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    }
  };
module.exports = Avatar;