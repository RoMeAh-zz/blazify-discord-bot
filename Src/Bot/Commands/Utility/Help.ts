import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

export default class Help extends Command {
    public constructor() {
        super("help", {
            aliases: ["help", "commands"],
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
                }
            ]
        });
    }

    public async exec(message: Message, { helpcmd }: {helpcmd: string}): Promise<Message> {

if (helpcmd) {

    const command = this.client.commandHandler.findCommand(helpcmd);
    if (!command) return message.util!.send(`That doesn't appear to be a valid command. Use the command ${this.prefix}help to see all available commands`);

    let embed = new MessageEmbed()
    .setTitle(command.aliases[0].charAt(0).toUpperCase() + command.aliases[0].slice(1))
    .setThumbnail(this.client.user!.displayAvatarURL())
    .setDescription(`Command name: ${command.aliases[0]}\n
    Description: ${command.description.content}\n
    Aliases: ${command.aliases.slice(1).join(", ")}\n
    Usage: ${command.description.usage}\n
    Category: ${command.category}\n
    Rate Limit: ${command.ratelimit}\n
    Required permissions: ${command.userPermissions ? "": "SEND_MESSAGES"}`)
    .setColor("RANDOM");
 
    return message.util!.send(embed);
  } else {

    const cmds = readdirSync(join(__dirname, "..", "..", "Commands")).filter(file => file.endsWith(".js"));;
    let embed = new MessageEmbed()
    .setTitle(`All commands for ${this.client.user?.username}`)
    .setAuthor("Blazify - The Ultimate All in One (Version 7)")
    .setThumbnail(this.client.user!.displayAvatarURL())
    .setColor("#ff0000")
    .setFooter(`Ensure that you use the prefix in front of commands. The prefix is ${this.prefix}. If you discover any bugs, please report them using ${this.prefix}contact <bug>`)
    
    cmds.forEach(folder => {
        for (let file of cmds)
        embed.addField(folder, file)
    })

    embed.addField("Other", "[Support Server](https://discord.gg/YtJ6pYu) | [Invite to your server](https://discordapp.com/oauth2/authorize?client_id=696756322825404416&scope=bot&permissions=2146958847) |  [Vote the Bot](https://glennbotlist.xyz/bot/690934802940952586/vote) | [Donate](https://paypal.me/roahgaming)")
    return message.util!.send(embed);

  };
}
}