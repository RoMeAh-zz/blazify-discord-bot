const {MessageEmbed} = require("discord.js");
const moment = require("moment"); //npm i moment
const ms = require("ms"); //npm i ms
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class GIVEAWAY extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "giveaway-start",
      description: "Starts a Giveaway",
      usage: "b3giveaway-start",
      category: "Giveaway",
      cooldown: 1000,
      aliases: ["gc", "start"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(client, message, args) {
        const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
            guildID: message.guild.id
        });
        const {enableGiveaway} = guildSettings;
    if(!enableGiveaway) return message.channel.send("Hmm it seems like the giveaway commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
            var time = moment().format("Do MMMM YYYY , hh:mm");
            var room;
            var title;
            var duration;
            var currentTime = new Date(),
                hours = currentTime.getHours() + 3,
                minutes = currentTime.getMinutes(),
                done = currentTime.getMinutes() + duration,
                seconds = currentTime.getSeconds();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            var suffix = "AM";
            if (hours > 12) {
                suffix = "PM";
                hours = hours - 12;
            }
            if (hours == 0) {
                hours = 12;
            }

            var filter = m => m.author.id === message.author.id;
            if (
                !message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")
            )
                return message.channel.send("**You do not have the manage messages permission**");
            message.channel.send(`**Provide channel ID**`)
                .then(msg => {
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 20000,
                        errors: ["time"]
                    })
                        .then(collected => {
                          let chname = collected.first().content
                            let room = message.guild.channels.cache.get(chname);
                            if (!room)
                                return message.channel.send("**Could not find the channel**");
                            room = collected.first().content;
                            collected.first().delete();
                            msg
                                .edit(
                                    "**Duration of the giveaway, seconds = s, minutes = m, hours = h, days = d, weeks = w**"
                                )
                                .then(msg => {
                                    message.channel
                                        .awaitMessages(filter, {
                                            max: 1,
                                            time: 20000,
                                            errors: ["time"]
                                        })
                                        .then(collected => {
                                            if (
                                                !collected.first().content.match(/[1-60][s,m,h,d,w]/g)
                                            )
                                                return message.channel.send(
                                                    "**This time is not supported!**"
                                                );
                                            duration = collected.first().content;
                                            collected.first().delete();
                                            msg.edit("**Now, what will the prize be?**").then(msg => {
                                                message.channel
                                                    .awaitMessages(filter, {
                                                        max: 1,
                                                        time: 20000,
                                                        errors: ["time"]
                                                    })
                                                    .then(collected => {
                                                        prize = collected.first().content;
                                                        collected.first().delete();
                                                        msg.edit("**Provide a guild ID**").then(msg => {
                                                            message.channel
                                                                .awaitMessages(filter, {
                                                                    max: 1,
                                                                    time: 20000,
                                                                    errors: ["time"]
                                                                })
                                                                .then(async collected => {
                                                                    let rguild = client.guilds.cache.get(collected.first().content)
                                                                    let reqguild = (await rguild.members.fetch()).map(m => m.id);
                                                                    if (!reqguild)
                                                                        return message.channel.send("**Could not find the guild or the client isn't present in the guild**");
                                                                    console.log(reqguild);
                                                                    msg.delete();
                                                                    message.delete();
                                                try {
                                                                        let giveEmbed = new MessageEmbed()
                                                                            .setDescription(
                                                                                `**Item:** ${prize}\nReact With 🎉 To Enter! \n**Total Giveaway Duration:** ${duration} \n **Created By:** ${message.member}`
                                                                            )
                                                                            .addField(
                                                                                "Invite link",
                                                                                `[Invite Me](https://discordapp.com/oauth2/authorize?client_id=690934802940952586&scope=client&permissions=2146958847)`
                                                                            )
                                                                            .addField("Requirment", "Guild"
                                                                            )
                                                                            .setColor("#FF0000")
                                                                            .setFooter("Time Created")
                                                                            .setTimestamp();
                                                                        message.guild.channels.cache.get(room)
                                                                            .send(
                                                                                "**Giveaway Created**",
                                                                                {embed: giveEmbed}
                                                                            )
                                                                            .then(m => {
                                                                                console.log(m)
                                                                        let re = m.react("🎉");
                                                                         setTimeout(() => {
                                                                                    let guild = reqguild
                                                                                    let users = m.reactions.cache.get("🎉").users
                                                                                    for (const user of users.cache.array()) {
                                                                                        if (!rguild.members.cache.get(user.id)) users.remove(user)
                                                                                    }
                                                                                    const gFilter = users.cache.random();
                                                                                    let endEmbed = new MessageEmbed()
                                                                                        .setAuthor(message.author.username, message.author.avatarURL)
                                                                                        .setTitle("**Item:** " + prize)
                                                                                        .addField(
                                                                                            "Giveaway Ended !",
                                                                                            `**Winner:** ${gFilter}`
                                                                                        )
                                                                                        .addField(
                                                                                            "Invite link",
                                                                                            `[Invite Me](https://discordapp.com/oauth2/authorize?client_id=690934802940952586&scope=client&permissions=2146958847)`
                                                                                        )
                                                                                        .setColor("#FF0000")
                                                                                        .setTimestamp();
                                                                                    m.edit(
                                                                                        "**GIVEAWAY ENDED**",
                                                                                        {embed: endEmbed}
                                                                                    );
                                                                                    message.guild.channels.cache
                                                                                        .get(room)
                                                                                        .send(
                                                                                            `**Congratulations ${gFilter}! contact ${message.author} for more info about The \`${prize}\`**`
                                                                                        );
                                                                                }, ms(duration));
                                                                            });
                                                                    } catch (e) {
                                                                        console.error(e)
                                                                    }
                                                                })
                                                        });
                                                    });
                                            });
                    });
                });
            });
        })
    }
}
module.exports = GIVEAWAY;