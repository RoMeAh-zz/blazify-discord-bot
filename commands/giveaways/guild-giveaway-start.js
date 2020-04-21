const { MessageEmbed } = require("discord.js");
const moment = require("moment"); //npm i moment
const ms = require("ms"); //npm i ms
module.exports = {
        name: "guild-giveaway-start",
        aliases: ["gc", "gs"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music",
        usage: "<input>",
        run: (client, message, args) => {
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
message.channel.send(`**What is the name of the giveaway channel?, dont include #, Example Channel: main-giveaway**`)
.then(msg => {
message.channel.awaitMessages(filter, {
max: 1,
time: 20000,
errors: ["time"]
})
.then(collected => {
let room = message.guild.channels.cache.get(collected.first().content);
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
title = collected.first().content;
collected.first().delete();
message.delete();
msg.edit("**Provide a guild ID**").then(msg => {
message.channel
.awaitMessages(filter, {
max: 1,
time: 20000,
errors: ["time"]
})
.then(collected => {
let reqguild = client.guilds.cache.get(collected.first().content);
console.log(reqguild);
if (!reqguild)
return message.channel.send("**Could not find the guild or the bot isn't present in the guild**")
msg.delete();
message.delete();
try {
let giveEmbed = new MessageEmbed()
.setDescription(
`**Item:** ${title}\nReact With <a:grxz:695226497115619408> To Enter! \n**Total Giveaway Duration:** ${duration} \n **Created By:** ${message.member}`
)
.addField(
"Invite link",
`[Invite Me](https://discordapp.com/oauth2/authorize?client_id=690934802940952586&scope=bot&permissions=2146958847)`
)
.setColor("#FF0000")
.setFooter("Time Created")
.setTimestamp();
message.guild.channels.cache.get(room)
.send(
"<a:grxz:695226497115619408><a:grxz:695226497115619408>**Giveaway Created**<a:grxz:695226497115619408><a:grxz:695226497115619408>",
{ embed: giveEmbed }
)
.then(m => {
let re = m.react("🎉");
setTimeout(() => {
  let guild = reqguild
let users = m.reactions.cache.get("🎉").users;
let list = guild.members.cache.get(users)
.array()
.filter(
user => user.id != client.user.id
);
    let gFilter = list[Math.floor(Math.random() * list.length)];
    let endEmbed = new MessageEmbed()
      .setAuthor(message.author.username,message.author.avatarURL)
      .setTitle("**Item:** " + title)
.addField(
"Giveaway Ended !<a:grxz:695226497115619408><a:grxz:695226497115619408>",
`**Winner:** ${gFilter}`
)
.addField(
"Invite link",
`[Invite Me](https://discordapp.com/oauth2/authorize?client_id=690934802940952586&scope=bot&permissions=2146958847)`
)
.setColor("#FF0000")
.setTimestamp();
m.edit(
"** <a:grxz:695226497115619408><a:grxz:695226497115619408> GIVEAWAY ENDED <a:grxz:695226497115619408><a:grxz:695226497115619408>**",
{ embed: endEmbed }
);
message.guild.channels.cache
.find(room)
.send(
`**Congratulations ${gFilter}! contact ${message.author} for more info about The \`${title}\`**`
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
