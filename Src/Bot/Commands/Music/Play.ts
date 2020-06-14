import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import { LavaClient } from "@anonymousg/lavajs";
import {Queue} from "@anonymousg/lavajs/dist/managers/Queue";
import { Utils } from "erela.js"

export default class Play extends Command {
    public constructor() {
        super ("play", {
            aliases: ["play", "song"],
            category: "Music",
            description: {
                content: "Plays a Song",
                examples: [
                    "<<play believer"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "song",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `${msg.author} please tell a song to play....`,
                    }
                }
            ]
        });
    }
    public async exec(message : Message, { song }: { song: string}) : Promise<any> {
        if(!message.member?.voice.channel) return message.util?.send(`${message.author} you are not present in any voice channel.`)
        let Player = await this.client.lava?.spawnPlayer(LavaClient, {
            guild: message.guild?.id ,
            voiceChannel: message.member.voice.channel ,
            textChannel: message.channel ,
            deafen: true ,
            trackRepeat: false ,
            queueRepeat: false ,
            skipOnError: true
        });
        message.util?.send(new MessageEmbed()
            .setAuthor("*Joined Voice Channel and I am ready..*")
            .setColor("GREEN")
            .setDescription(`\n
            \`Text Channel\`: ${message.channel}\n
            \`Voice Channel\`: ${message.member?.voice.channel}\n
            \`Guild Name\`: ${message.guild?.name}`)
        );
        let queue = new Queue(LavaClient)
        let Song = await Player.lavaSearch(song, message.member, true)
        if(!Song) return message.util?.send("No Song Found. Please Try Again")

        await queue.add(Song)
        await Player.play(Song)
        if(Player.playState) {
            message.util?.send(new MessageEmbed()
                .setAuthor(Song.author)
                .setDescription(Song.title + `[${Song.title}](${Song.uri})`)
                .setImage(Song.thumbnail.max)
                .setThumbnail(`message.guild?.iconURL ( {dynamic: true} )`)
            )
                }
        console.log ( Song )
        if (!Player.playState) {
            console.log("flop")
            setTimeout ( async () => {
                await Player.destroy (message.guild?.id)
                await message.util?.send ( "I was too long in the Voice Channel and no Song was Played" )
            }, 10000 )
        }
    }
}