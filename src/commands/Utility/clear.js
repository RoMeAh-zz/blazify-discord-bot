const { MessageEmbed, Discord } = require("discord.js");
const BlazifyClient = require("../../base/Command");
const Settings = require("../../models/configsetting.js");

class Clear extends BlazifyClient {
    constructor(client) {
        super(client, {
            name: "clear",
            description: "Clears the chat",
            usage: "b3clear <amt>",
            category: "Utility",
            cooldown: 1000,
            aliases: ["purge", "nuke"],
            permLevel: 1,
            permission: "READ_MESSAGES"
        });
    }
    async run(client, message, args) {

        if (message.deletable) {
            message.delete();
            const guildSettings = await Settings.findOne({ guildID: message.guild.id }) || new Settings({
                guildID: message.guild.id
            });
            const { enableUtility } = guildSettings;
            if (!enableUtility) return message.channel.send("Hmm it seems like the Utility commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");

            // Member doesn't have permissions
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                return message.reply("You can't delete messages....").then(m => m.delete({ timeout: 5000 }));
            }

            // Check if args[0] is a number
            if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                return message.reply("Yeah.... That's not a numer? I also can't delete 0 messages by the way.").then(m => m.delete({timeout: 5000}));
            }

            // Maybe the client can't delete messages
            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                return message.reply("Sorryy... I can't delete messages.").then(m => m.delete({ timeout: 5000 }))
            }

            let deleteAmount;

            if (parseInt(args[0]) > 100) {
                deleteAmount = 100;
            } else {
                deleteAmount = parseInt(args[0]);
            }

            message.channel.bulkDelete(deleteAmount, true)
                .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`))
                .catch(err => message.reply(`Something went wrong... ${err}`));

        }
    }
}
module.exports = Clear;