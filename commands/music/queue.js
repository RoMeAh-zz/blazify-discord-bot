const { RichEmbed } = require("discord.js")
const Settings = require("../../models/configsetting.js");
module.exports = {
        name: "queue",
        aliases: ["q", "list", "now"],
        description: "Displays what the current queue is.",
        accessableby: "Member",
        category: "music",
    run: async (bot, message, args) => {
 const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableMusic} = guildSettings;
if(!enableMusic) return message.channel.send("Hmm it seems like the Music commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
        const player = bot.music.players.get(message.guild.id);
        if(!player || !player.queue[0]) return message.channel.send("No song currently playing in this guild.");

        let index = 1;
        let string = "";

            if(player.queue[0]) string += `__**Currently Playing**__\n ${player.queue[0].title} - **Requested by ${player.queue[0].requester.username}**. \n`;
            if(player.queue[1]) string += `__**Rest of queue:**__\n ${player.queue.slice(1, 10).map(x => `**${index++})** ${x.title} - **Requested by ${x.requester.username}**.`).join("\n")}`;

        const embed = new RichEmbed()
            .setAuthor(`Current Queue for ${message.guild.name}`, message.guild.iconURL)
            .setThumbnail(player.queue[0].thumbnail)
            .setDescription(string);

        return message.channel.send(embed);
    }
  }

