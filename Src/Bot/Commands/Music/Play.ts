import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import { Queue } from "@anonymousg/lavajs";
import { Player } from "@anonymousg/lavajs";
import {LavaClient} from "@anonymousg/lavajs/dist/managers/LavaClient";

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
         let player =  await this.client.lava?.spawnPlayer ( this.client.lava , {
        guild: message.guild ,
        voiceChannel: message.member.voice.channel ,
        textChannel: message.channel ,
        deafen: true ,
        trackRepeat: false ,
        queueRepeat: false ,
        skipOnError: true
    } );
    message.util?.send(new MessageEmbed()
        .setAuthor("*Joined Voice Channel and I am ready..*")
        .setColor("GREEN")
        .setDescription(`\n
            \`Text Channel\`: ${message.channel}\n
            \`Voice Channel\`: ${message.member?.voice.channel}\n
            \`Guild Name\`: ${message.guild?.name}`)
    );
        let queue = new Queue(player)
            let Song: any = await player.lavaSearch(song, message.member, true).catch((err: any) => {
                message.util?.send ( err )
            });
        await queue.add(Song)
            await player.play ();
            await message.util?.send(new MessageEmbed()
                .setAuthor(Song.author)
                .setDescription(`[${Song.title}](${Song.uri}). Requested by ${Song.user.user.username}`)
                .setImage(Song.thumbnail.max)
                .setThumbnail(message.author?.displayAvatarURL( {dynamic: true} ))
            )
        console.log ( Song )
            setTimeout ( async () => {
                await player.destroy ( message.guild?.id )
                await message.util?.send ( "Song Complete :)" )
            } , Song.length )
    }
}