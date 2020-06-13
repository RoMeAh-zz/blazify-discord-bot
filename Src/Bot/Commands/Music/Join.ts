import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import { LavaClient } from "@anonymousg/lavajs";

export default class Join extends Command {
    public constructor() {
        super ("join", {
            aliases: ["join", "vcjoin"],
            category: "Music",
            description: {
                content: "Joins a Voice Channel so that Music can be player",
                examples: [
                    "<<join"
                ]
            },
            ratelimit: 3,
        });
    }
    public async exec(message : Message) : Promise<any> {
        if(!message.member?.voice.channel) return message.util?.send(`${message.author} you are not present in any voice channel.`)
        //@ts-ignore
        await this.client.music?.spawnPlayer(LavaClient, {
            guild: message.guild?.id,
            voiceChannel: message.member.voice.channel,
            textChannel: message.channel,
            deafen: true,
            trackRepeat: false,
            queueRepeat: false,
            skipOnError: true
        });
        // @ts-ignore
        message.util.send(new MessageEmbed()
            .setAuthor("*Joined Voice Channel and I am ready..*")
            .setColor("GREEN")
            .setDescription(`\n
            \`Text Channel\`: ${message.channel}\n
            \`Voice Channel\`: ${message.member?.voice.channel}\n
            \`Guild Name\`: ${message.guild?.name}`)
        )
    }
}