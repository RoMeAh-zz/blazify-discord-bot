import { LavaClient, Track, Player } from "@anonymousg/lavajs"
import { MessageEmbed } from "discord.js";
import { formatTime } from "..";
import { AkairoClient } from "discord-akairo";
import { VoiceChannel } from "discord.js";
import { TextChannel } from "discord.js";

export class LavaJSManager  {
    constructor(client: AkairoClient) {
        client.on("ready", () => {
            const nodes = [{
                host: "localhost",
                port: 2333,
                password: "youshallnotpass"
            }]
            client.lava = new LavaClient(client, nodes)
            client.lava.on( "nodeSuccess", async (node: { options: { port: number; }; }) => {
                client.logger.info ( `[Lavalink ${node.options.port}: LavaJS] => Connected` )
            });
            client.lava.on("nodeClose", async(node: object, error: string) => {
                client.logger.error(`[Lavalink ${node}: LavaJS] => Disconnected\n`+ error)
            })
            client.lava.on("nodeError", async(node: object, error: string) => {
                client.logger.error(`[Lavalink ${node}: LavaJS] => Errored\n`+ error)
            })
            client.lava.on("nodeReconnect", async(node: object) => {
                client.logger.info(`[Lavalink ${node}: LavaJS] => Reconnected\n`)
            })
            client.lava.on("createPlayer", async(player: { options: { textChannel: { send: (arg0: MessageEmbed) => void; }; voiceChannel: VoiceChannel; guild: { name: string; }; }; }) => {
                return player.options.textChannel.send(new MessageEmbed()
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
            client.lava.on("trackPlay",async (track: Track, player: Player) => {
                 player.options.textChannel.send(new MessageEmbed()
                    .setAuthor(track.author)
                    .setDescription(`[${track.title}](${track.uri}). Time: ${formatTime(track.length)}\n Requested by ${track.user.username}`)
                    .setImage(track.thumbnail.max)
                    .setThumbnail(track.user.displayAvatarURL( {dynamic: true} ))
                )
            })
            client.lava.on("trackOver",async (track: Track, player: Player) => {
                player.options.textChannel.send(new MessageEmbed()
                    .setAuthor(track.author)
                    .setDescription(`[${track.title}](${track.uri}).\n Requested by ${track.user.username} has end`)
                    .setImage(track.thumbnail.max)
                    .setThumbnail(track.user.displayAvatarURL( {dynamic: true} ))
                )
            })
            client.lava.on("queueOver", async (player: Player) => {
                player.destroy()
            })
        })
    }
    }