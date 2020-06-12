import { Command} from "discord-akairo";
import {Message, GuildMember} from "discord.js";
import { Repository } from "typeorm";

import { Warns } from "../../../Lib/Database/Models/Warns"

export default class Warn extends Command{
    public constructor() {
        super("warn", {
            aliases: ["warn"],
            category: "Moderation",
            description: {
                content: "Warns a user for breaking a rule",
                usage: "warn [member] [reason]",
                examples: [
                    "warn @user get wrecked"
                ]
            },
            ratelimit: 3,
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                  id: "member",
                  type: "member",
                  prompt: {
                      start: (msg: Message) => `${msg.author} please tell a valid member to warn....`,
                      retry: (msg: Message) => `${msg.author}, please provide a valid person to be warned`
                  }
                },
                {
                    id: "reason",
                    type: "string",
                    match: "rest",
                    default: "No reason has been provided"
                }
            ]
        });
    }
    public async exec(message: Message, { member, reason }: { member: GuildMember, reason: string }): Promise<Message> {
        const warnRepo: Repository<Warns> = this.client.db.getRepository(Warns);
        if (member.roles.highest.position >= message!.member!.roles.highest.position && message.author.id != message!.guild!.ownerID)
            return message!.util!.reply("This member has higher or equal role to you");

        await warnRepo.insert({
            guild: message!.guild!.id,
            user: member.id,
            moderator: message.author.id,
            reason: reason
        })

        return message!.util!.send(`**${member.user.tag}** has been warned by **${message.author.tag}** for \`${reason}\``);
    }
}