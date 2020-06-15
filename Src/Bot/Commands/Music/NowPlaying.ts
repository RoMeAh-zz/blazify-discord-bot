import { Command } from "discord-akairo";
import {Message , MessageEmbed} from "discord.js";
import {decode} from "querystring";
import { stripIndents } from "common-tags";
import {formatTime} from "../../../Lib/Structures/formatTime";

export default class Join extends Command{
    public constructor() {
        super ( "nowplaying" , {
            aliases: ["np"] ,
            category: "Music" ,
            description: {
                content: "Shows the Current Played Song" ,
                examples: [
                    "<<join"
                ]
            } ,
            ratelimit: 3 ,
        } );
    }

    public async exec(message : Message) : Promise<any> {
        if(!message.member?.voice.channel) return message.util?.send(`${message.author} you are not present in any voice channel.`)
        //@ts-ignore
        let player = this.client.lava.playerCollection.get(message.guild?.id)

        if(!player.playState) return message.util?.send("No Song is Present in Queue.")

        const np = Object.assign({ user: player.queue[0].user.user.username, title: player.queue[0].title, uri: player.queue[0].uri, length: player.queue[0].length  }, decode(player.queue[0]));
        const embed = new MessageEmbed()
            .setAuthor(
                `Current Queue for ${message.guild?.name}`,
            )
            .setThumbnail(np.uri)
            .setDescription(stripIndents`
            ${
                player.playing ? "▶️" : "⏸️"
            } **[${np.title}](${np.uri})** \`${formatTime(
                Number(np.length),
                true
            )}\` by ${np.user}
            `);
        message.util?.send(embed)
    }
    }