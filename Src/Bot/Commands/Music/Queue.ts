import { Command } from "discord-akairo";
import {Message , MessageEmbed} from "discord.js";
import {formatTime} from "../../../Lib/Structures/formatTime";
const Pagination = require('discord-paginationembed')

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

    public async exec(message : Message, { arg }: { arg: "string"}) : Promise<any> {
        if(!message.member?.voice.channel) return message.util?.send(`${message.author} you are not present in any voice channel.`)
         //@ts-ignore
        let player = this.client.lava.playerCollection.get(message.guild?.id)

        const nowplaying = player.queue[0]
             const songs = player.queue.slice(1)
             if (songs[0]) {
               const Embed = new MessageEmbed()
                 .addField(
                   `# - Queue`,
                   (el: { title: any; uri: any; } , i: number) => `${i + 1} - **[${el.title}](${el.uri})**`
                 )
                 .setColor(16711717)
                 .setDescription(`**Playing: [${nowplaying.title}](${nowplaying.uri})**`)
                 .setFooter(
                   'Requested by ' + message.author.tag,
                   message.author.displayAvatarURL({dynamic: true})
                 )
                 message.util?.send(Embed)
            } else {
               const Embed = new MessageEmbed()
                 .setColor(16711717)
                 .setDescription(`**Playing: [${nowplaying.title}](${nowplaying.uri})**`)
                 .setFooter(
                   'Requested by ' + message.author.tag,
                   message.author.displayAvatarURL({dynamic: true})
                 )
               message.util?.send(Embed)
            }
    }
}