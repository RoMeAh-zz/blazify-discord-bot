import { Command } from "discord-akairo";
import {Message , MessageEmbed} from "discord.js";
import {formatTime} from "../../../Lib/Structures/formatTime";
import {decode} from "querystring";

export default class Join extends Command{
    public constructor() {
            super ( "queue" , {
            aliases: ["queue"] ,
            category: "Music" ,
            description: {
                content: "Shows Queue" ,
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

        let index = 1;
        let string = "";
        if(!player.queue) return message.util?.send("No Song is Present in Queue.")

        const next = player.queue.map((t: { user: any; title: any;}) => Object.assign({ user: t.user.user.username , title: t.title}, decode(player.queue.slice(1))));
        const np = Object.assign({ user: player.queue[0].user.user.username, title: player.queue[0].title }, decode(player.queue[0]));
        if (np)
            string += `__**Currently Playing**__\n ${np.title} - **Requested by ${np.user}**. \n`;
        if (next[1])
            string += `__**Rest of queue:**__\n ${next
                .slice(1, 10)
                .map(
                    (x: { title: any; user: any; }) =>
                        `**${index++})** ${x.title} - **Requested by
                            ${x.user}**.`
                )
                .join("\n")}`;

        const embed = new MessageEmbed()
            .setAuthor(
                `Current Queue for ${message.guild?.name}`,
            )
            .setDescription(string);

        return message.channel.send(embed);
    }
}