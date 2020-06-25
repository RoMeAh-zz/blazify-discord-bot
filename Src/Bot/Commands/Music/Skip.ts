import { Command } from "discord-akairo";
import { Message } from "discord.js";


export default class Skip extends Command{
    public constructor() {
        super ("skip", {
            aliases: ["skip"] ,
            category: "Music" ,
            description: {
                content: "Skips Music" ,
                examples: [
                    "<<skip"
                ]
            } ,
            ratelimit: 3 ,
        } );
    }

    public async exec(message : Message) : Promise<Message> {
        if(!message.member?.voice.channel) return message.util!.send(`${message.author} you are not present in any voice channel.`)
        let player = this.client.lava.playerCollection.get(message.guild!.id)
        if(!player) {
            return message.util!.send ( "No Song is Played in the server" )
        }  else {
            player.stop();
        }
        return message.delete()
    }
}