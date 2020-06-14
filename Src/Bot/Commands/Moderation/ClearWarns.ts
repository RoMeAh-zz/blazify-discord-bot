import { Command } from "discord-akairo";
import { Message, GuildMember, User, MessageEmbed } from "discord.js";
import { Repository  } from "typeorm";

import { Warns } from "../../../Lib/Database/Models/Warns";

export default class ModLogs extends Command {
    public constructor() {
        super ("clearwarns" , {
            aliases: ["clearwarns" , "cw"] ,
            category: "Moderation" ,
            description: {
                content: "Clears ModLogs of a User" ,
                usage: "clearwarns [ member ] [ number ]" ,
                examples: [
                    "clearwarns Dumb 1"
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
        const warns: Warns[0] = await warnRepo.find({ user: member.id, guild: message.guild.id });

        if(!warns.length) {
            // @ts-ignore
            return message.util.send("No Mod Logs found about this user");
        } else {
            await warnRepo.delete ( warns )
        }
        return message.util!.send(`${message.author} Cleared Warns of ${member.user.username}`)
    }
}