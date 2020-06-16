import { Command } from "discord-akairo";
import { Message } from "discord.js";


export default class Join extends Command{
    public constructor() {
        super ( "loop" , {
            aliases: ["lt" , "loop"] ,
            category: "Music" ,
            description: {
                content: "Stops Music" ,
                examples: [
                    "<<leave"
                ]
            } ,
            ratelimit: 3 ,
        } );
    }

    public async exec(message : Message) : Promise<any> {
        if(!message.member?.voice.channel) return message.util?.send(`${message.author} you are not present in any voice channel.`)
        // @ts-ignore
        let player = this.client.lava.playerCollection.get(message.guild?.id)
        if(!player) {
            return message.util?.send ( "No Song is Played in the server" )
        }  else {
            if (!player.repeatTrack) {
                player.repeatTrack = true;
                message.util?.send("The Player will loop the current song")
            } else {
                player.repeatTrack = false;
                message.util?.send("Loop Deactivated")
            }
        }
    }
}