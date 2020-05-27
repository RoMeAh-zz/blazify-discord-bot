const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../../Lib/Structures/functions.js");
const PerGuildLogandWelcome = require("../../../Lib/Database/models/perguildlogandwelcome.js")
const Settings = require("../../../Lib/Database/models/configsetting.js");
const BlazifyClient = require("../../../Lib/Base/Command");
class Kick extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "kick",
      description: "Kicks a user from the server",
      usage: "b3kick @noob u are noob",
      category: "Moderation",
      cooldown: 1000,
      aliases: ["ki"],
      permLevel: 1,
      permission: "KICK_MEMBERS"
    });
  }
async run(client, message, args) {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const guildTandC = await PerGuildLogandWelcome.findOne({guildID: message.guild.id}) || new PerGuildLogandWelcome({
      guildID: message.guild.id
    })
    const {logChannel} = guildTandC;
    const {enableModeration} = guildSettings;
if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)")
        if (message.deletable) message.delete();

        // No args
        if (!args[0]) {
            return message.reply("Please provide a person to kick.")
                  .then(m => m.delete({timeout: 5000}));
        }

        // No reason
        if (!args[1]) {
            return message.reply("Please provide a reason to kick.")
                .then(m => m.delete({timeout: 5000}));
        }

        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ You do not have permissions to kick members. Please contact a staff member")
                    .then(m => m.delete({timeout: 5000}));
        }

        // No client permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ I do not have permissions to kick members. Please contact a staff member")
                    .then(m => m.delete({timeout: 5000}));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toKick) {
            return message.reply("Couldn't find that member, try again")
                .then(m => m.delete({timeout: 5000}));
        }

        // Can't kick urself
        if (toKick.id === message.author.id) {
            return message.reply("You can't kick yourself...")
                      .then(m => m.delete({timeout: 5000}));
        }

        // Check if the user's kickable
        if (!toKick.kickable) {
            return message.reply("I can't kick that person due to role hierarchy, I suppose.")
                      .then(m => m.delete({timeout: 5000}));
        }

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**> Kicked member:** ${toKick} (${toKick.id})
            **> Kicked by:** ${message.member} (${message.member.id})
            **> Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Do you want to kick ${toKick}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // The verification stuffs
            if (emoji === "✅") {
                msg.delete();

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Well.... the kick didn't work out. Here's the error ${err}`)
                    });

                    const log = message.guild.channels.get(logChannel.id)
                    if(!log) {
                      return message.channel.send(embed)
                    } else {
                      log.send (embed)
                    }
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`Kick canceled.`)
                        .then(m => m.delete({timeout: 5000}));
            }
        });
    }
};
module.exports = Kick;