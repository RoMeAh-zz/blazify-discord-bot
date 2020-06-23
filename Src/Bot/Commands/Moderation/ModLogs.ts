import { Command } from "discord-akairo";
import { Message, GuildMember, User, MessageEmbed } from "discord.js";
import { Repository  } from "typeorm";

import { Warns } from "../../../Lib";

export default class ModLogs extends Command {
    public constructor() {
        super ("modlogs" , {
            aliases: ["modlogs" , "userstrikes"] ,
            category: "Moderation" ,
            description: {
                content: "Check ModLogs of a User" ,
                usage: "modlogs [ member ]" ,
                examples: [
                    "modlogs Dumb"
                ]
            } ,
            ratelimit: 3 ,
            args: [
                {
                    id: "member" ,
                    type: "member" ,
                    default: (msg : Message) => msg.member
                }
            ]
        });
    }
    public async exec(message: Message, { member }: { member: GuildMember }): Promise<Message> {
        const warnRepo: Repository<Warns> = this.client.db.getRepository(Warns)
        // @ts-ignore
        const warns: Warns[] = await warnRepo.find({ user: member.id, guild: message.guild.id });

        if(!warns.length) {
            // @ts-ignore
            return message.util.send("No Mod Logs found about this user");
        }

        const infractions = await Promise.all(warns.map(async  (v: Warns, i: number) => {
            // @ts-ignore
            const mod: User = await this.client.users.fetch(v.moderator).catch(() => null);
            if(mod) return {
                index: i + 1,
                moderator: mod.tag,
                reason: v.reason
            }
        }));


        return message.util!.send(new MessageEmbed()
            .setAuthor(`ModLogs`, member.user.displayAvatarURL({dynamic: true}))
            .setColor("#FF0000")
            //@ts-ignore
            .setDescription(infractions.map(v => `\`#${v.index}\` | Action: \`Warn\` Moderator: *${v.moderator}*\n Reason: *${v.reason}*\n `))
        )
    }
}