const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
let Prefix = require("../../../Lib/Database/models/prefix.js");
let prefix;
const BlazifyClient = require("../../../Lib/Base/Command")
class Help extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Shows all the commands and how to use them",
      usage: "b3help",
      category: "None",
      cooldown: 1000,
      aliases: ["h"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(client, message, args) {
    await Prefix.findOne({ guildID: message.guild.id }, (err, prefixes) => {
      if (err) console.log(err);

      prefix = prefixes.prefix;

    });

    if (args[0]) {

      const command = client.commands.get(client.aliases.get(args[0].toLowerCase())) || client.commands.get(args[0].toLowerCase());
      if (!command) return message.channel.send(`That doesn't appear to be a valid command. Use the command ${prefix}help to see all available commands`);

      let embed = new MessageEmbed()
      .setTitle(command.help.name.charAt(0).toUpperCase() + command.help.name.slice(1))
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`Command name: ${command.help.name}\n
      Description: ${command.help.description}\n
      Aliases: ${command.conf.aliases.join(", ")}\n
      Usage: ${command.help.usage}\n
      Category: ${command.help.category}\n
      Cooldown: ${command.conf.cooldown}\n
      Required permissions: ${command.conf.permission}`)
      .setColor("RANDOM");

      message.channel.send(embed);
    } else {

      const dir = readdirSync("./Bot/Commands/");

      let embed = new MessageEmbed()
      .setTitle(`All commands for ${client.user.username}`)
      .setAuthor("Blazify - The Ultimate All in One (Version 7)")
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("#ff0000")
      .setFooter(`Ensure that you use the prefix in front of commands. The prefix is ${prefix}. If you discover any bugs, please report them using ${prefix}contact <bug>`);
  
      dir.forEach(category => {
        
        const commands = client.commands.filter(x => x.help.category === category); 
        embed.addField(category , commands.map(x => x.help.name).join(", "));
      });
  
      embed.addField("Other", "[Support Server](https://discord.gg/YtJ6pYu) | [Invite to your server](https://discordapp.com/oauth2/authorize?client_id=696756322825404416&scope=bot&permissions=2146958847) |  [Vote the Bot](https://glennbotlist.xyz/bot/690934802940952586/vote) | [Donate](https://paypal.me/roahgaming)")
      message.channel.send(embed);

    };
  }
};
module.exports = Help;