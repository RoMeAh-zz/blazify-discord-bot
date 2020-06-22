import { LavaClient } from "@anonymousg/lavajs"
import { MessageEmbed } from "discord.js";
import { formatTime } from "./formatTime";

export default class LavaJS  {
    constructor(client: any) {
        client = client
        client.on("ready", () => {
            const nodes = [{
                host: "localhost",
                port: 2333,
                password: "youshallnotpass"
            }]
            client.lava = new LavaClient(client, nodes)
            client.lava.on( "nodeSuccess", async (node: { options: { port: number; }; }) => {
                console.log ( `[Lavalink ${node.options.port}: LavaJS] => Connected` )
            });
            client.lava.on("nodeClose", async(node: object, error: string) => {
                console.log(`[Lavalink ${node}: LavaJS] => Disconnected\n`+ error)
            })
            client.lava.on("nodeError", async(node: object, error: string) => {
                console.log(`[Lavalink ${node}: LavaJS] => Errored\n`+ error)
            })
            client.lava.on("nodeReconnect", async(node: object) => {
                console.log(`[Lavalink ${node}: LavaJS] => Reconnected\n`)
            })
            client.lava.on("createPlayer", async(player: { options: { textChannel: { send: (arg0: any) => void; }; voiceChannel: any; guild: { name: any; }; }; }) => {
                player.options.textChannel.send(new MessageEmbed()
                    .setAuthor("*Joined Voice Channel and I am ready..*")
                    .setColor("GREEN")
                    .setDescription(`\n
            \`Text Channel\`: ${player.options.textChannel}\n
            \`Voice Channel\`: ${player.options.voiceChannel}\n
            \`Guild Name\`: ${player.options.guild.name}`)
                );
            })
            client.lava.on("destroyPlayer", (player: { options: { textChannel: { send: (arg0: string) => void; }; }; }) => {
                player.options.textChannel.send("Ok Bye. I left the Channel....")
            } )
            client.lava.on("trackPlay",async (track: { author: any; title: any; uri: any; length: any; user: { user: { username: any; displayAvatarURL: (arg0: { dynamic: boolean; }) => any; }; }; thumbnail: { max: any; }; }, player: { options: { textChannel: { send: (arg0: any) => void; }; }; }) => {
                 player.options.textChannel.send(new MessageEmbed()
                    .setAuthor(track.author)
                    .setDescription(`[${track.title}](${track.uri}). Time: ${formatTime(track.length)}\n Requested by ${track.user.user.username}`)
                    .setImage(track.thumbnail.max)
                    .setThumbnail(track.user.user.displayAvatarURL( {dynamic: true} ))
                )
            })
            client.lava.on("trackOver",async (track: { author: any; title: any; uri: any; user: { user: { username: any; }; displayAvatarURL: (arg0: { dynamic: boolean; }) => any; }; thumbnail: { max: any; }; }, player: { options: { textChannel: { send: (arg0: any) => void; }; }; }) => {
                player.options.textChannel.send(new MessageEmbed()
                    .setAuthor(track.author)
                    .setDescription(`[${track.title}](${track.uri}).\n Requested by ${track.user.user.username} has end`)
                    .setImage(track.thumbnail.max)
                    .setThumbnail(track.user.displayAvatarURL( {dynamic: true} ))
                )
            })
            client.lava.on("queueOver", async (player: { destroy: (arg0: any) => void; guild: any; }) => {
                player.destroy(player.guild)
            })
        })
    }
    }