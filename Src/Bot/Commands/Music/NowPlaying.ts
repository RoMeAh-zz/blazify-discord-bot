import { Command } from "discord-akairo";
import {Message , MessageEmbed} from "discord.js";
import {decode} from "querystring";
import { stripIndents } from "common-tags";
import {formatTime} from "../../../Lib";

export default class Join extends Command{
    public constructor() {
        super ( "nowplaying" , {
            aliases: ["nowplaying"] ,
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

        if(!player?.playState) return message.util?.send("No Song is Present in Queue.")

        const np = Object.assign(
            { user: player?.queue.first.user.username,
                title: player?.queue.first.title,
                uri: player?.queue.first.uri,
                length: player?.queue.first.length  });
        const embed = new MessageEmbed()
            .setAuthor(
                `Current Queue for ${message.guild?.name}`,
            )
            .setThumbnail(np.uri)
            .setDescription(stripIndents`
            ${
                player?.playState ? "▶️" : "⏸️"
            } **[${np.title}](${np.uri})** \`${formatTime(
                Number(np.length),
                true
            )}\` by ${np.user}
            `);
        message.util?.send(embed)
    }
    }