import { Category } from "discord-akairo";
import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class extends Command {
  public constructor() {
    super("help", {
      aliases: ["help", "commands", "cmds"],
      args: [
        {
          id: "command",
          type: "commandAlias",
        },
      ],
      description: "Help on how to use commands",
      userPermissions: ["SEND_MESSAGES"],
      category: "Information",
    });
  }

  public exec(message: Message, { command }: { command: Command }) {
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        `${message.guild?.name} Help Menu`,
        message.guild?.iconURL({ dynamic: true }) ?? undefined
      )
      .setThumbnail(this.client.user?.displayAvatarURL()!)
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    if (command) {
      embed.setAuthor(
        `${command.aliases[0]} Command Help`,
        this.client.user?.displayAvatarURL()
      );
      embed.setDescription([
        `**❯ Aliases:** ${
          command.aliases.length
            ? command.aliases
                .filter((_, i) => i !== 0)
                .map((alias) => `\`${alias}\``)
                .join(" ")
            : "No Aliases"
        }`,
        `**❯ Description:** ${command.description}`,
        `**❯ Category:** ${command.category}`,
      ]);

      return message.util?.send(embed);
    } else {
      embed.setDescription([
        `These are the available commands for ${message.guild?.name}`,
        `The bot's prefix is: b!`,
        `Command Parameters: \`<>\` is strict & \`[]\` is optional`,
      ]);
      for (const [name, category] of this.handler.categories.filter(
        this.categoryFilter(message)
      )) {
        embed.addField(
          `**❯ ${name.replace(/(\b\w)/gi, (str) => str.toUpperCase())} (${
            category.size
          }):**`,
          category
            .filter((cmd) => (cmd.aliases ? cmd.aliases.length > 0 : false))
            .map((cmd) => `\`${cmd.aliases[0]}\``)
            .join(", ")
        );
      }
      return message.util?.send(embed);
    }
  }

  private categoryFilter(message: Message) {
    return (c: Category<string, Command>) =>
      ![
        "flag",
        ...(this.client.ownerID.includes(message.author.id) || !message.guild
          ? []
          : message.member?.hasPermission("MANAGE_GUILD", {
              checkAdmin: true,
              checkOwner: true,
            })
          ? ["master", "flag"]
          : ["flag", "master", "settings"]),
      ].includes(c.id);
  }
}
