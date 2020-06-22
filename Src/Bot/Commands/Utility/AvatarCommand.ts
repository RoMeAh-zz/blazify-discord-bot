import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed, ImageSize } from "discord.js";

export default class AvatarCommand extends Command {
    public constructor() {
        super("avatar", {
            aliases: ["avatar", "av", "pfp"],
            category: "utility",
            description: {
                content: "Displays the avatar of a user and its size",
                usage: "avatar [ user ] [ size ]",
                examples: [
                    "avatar",
                    "avatar @Hell Yea Boi",
                    "avatar @Hell Yea Boi 2048"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    match: "rest",
                    default: (msg: Message) => msg.member
                },
                {
                    id: "size",
                    type: (_: Message, str: string): null | Number => {
                        if(str && !isNaN(Number(str)) && [16, 32, 64, 128, 256, 512, 1024, 2048].includes(Number(str))) return Number(str);
                        return null;
                    },
                    match: "option",
                    flag: ["-size="],
                    default: 2048
                }
            ]
        });
    }
    public exec(message: Message, { member, size }: { member: GuildMember, size: number}): Promise<Message> {
        return message!.util!.send(new MessageEmbed()
            .setTitle(`Avatar | ${member.user.tag}`)
            .setColor("#ff0000")
            .setImage(member.user.displayAvatarURL({size: size as ImageSize}))
        )
    }
}