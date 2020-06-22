import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { prefix } from "../../../Config";
import { MessageEmbed } from "discord.js";
import { readdirSync } from "fs";

export default class Help extends Command {
    public constructor() {
        super("help", {
            aliases: ["h", "commands"],
            category: "Utility",
            description: {
                content: "Check the latency of the bot to the Discord API",
                usage: "<<help",
                examples: [
                    "help"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "helpcmd",
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    public async exec(message: Message, { helpcmd }: {helpcmd: string}): Promise<any> {

if (!helpcmd) {

    const command = this.client.commands.get(this.client.commands.aliases.get(helpcmd.toLowerCase())) || this.client.commands.get(helpcmd.toLowerCase());
    if (!command) return message.util!.send(`That doesn't appear to be a valid command. Use the command ${prefix}help to see all available commands`);

    let embed = new MessageEmbed()
    .setTitle(command.name.charAt(0).toUpperCase() + command.name.slice(1))
    .setThumbnail(this.client.user!.displayAvatarURL())
    .setDescription(`Command name: ${command.name}\n
    Description: ${command.description}\n
    Aliases: ${command.conf.aliases.join(", ")}\n
    Usage: ${command.help.usage}\n
    Category: ${command.help.category}\n
    Cooldown: ${command.conf.cooldown}\n
    Required permissions: ${command.conf.permission}`)
    .setColor("RANDOM");

    return message.util!.send(embed);
  } else {

    const dir = readdirSync("./Bot/Commands/");

    let embed = new MessageEmbed()
    .setTitle(`All commands for ${this.client.user?.username}`)
    .setAuthor("Blazify - The Ultimate All in One (Version 7)")
    .setThumbnail(this.client.user!.displayAvatarURL())
    .setColor("#ff0000")
    .setFooter(`Ensure that you use the prefix in front of commands. The prefix is ${prefix}. If you discover any bugs, please report them using ${prefix}contact <bug>`);

    dir.forEach(category => {
      
      const commands = this.client.commands.filter((x: { help: { category: string; }; }) => x.help.category === category); 
      embed.addField(category , commands.map((x: { help: { name: string; }; }) => x.help.name).join(", "));
    });

    embed.addField("Other", "[Support Server](https://discord.gg/YtJ6pYu) | [Invite to your server](https://discordapp.com/oauth2/authorize?client_id=696756322825404416&scope=bot&permissions=2146958847) |  [Vote the Bot](https://glennbotlist.xyz/bot/690934802940952586/vote) | [Donate](https://paypal.me/roahgaming)")
    message.channel.send(embed);

  };
}
}