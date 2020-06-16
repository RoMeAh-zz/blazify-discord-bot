import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import {Message , MessageEmbed} from "discord.js";
import { join } from "path";
import {prefix , ownerID , secret} from "../../Config";
import { Connection } from "typeorm"
import Database  from "../Database/Database"
import Oauth from "discord-oauth2";
import { LavaClient } from "@anonymousg/lavajs/dist/managers/LavaClient";
import {formatTime} from "../Structures/formatTime";


declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler
        listnerHandler: ListenerHandler
        db: Connection;
        lava: LavaClient;
        oauth: Oauth;
        oauthURL: any;
    }
}
interface BotOptions{
    token? : string
    ownerID? : string | Array<string>
}


export default class BlazifyClient extends AkairoClient {
    public config: BotOptions;
    public db!: Connection;
    public lava!: LavaClient;
    public oauth!: Oauth;
    public oauthURL!: any;
    public listnerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "..", "Bot/Events/")
    })
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "..", "Bot/Commands/"),
        prefix: prefix,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        blockBots: true,
        blockClient: true,
        commandUtilLifetime: 30,
        defaultCooldown: 60000,
        argumentDefaults: {
            prompt: {
                modifyStart: (_:Message, str: string): string => `${str}\n\n Type \`cancel\` to cancel the command`,
                modifyRetry: (_:Message, str: string): string => `${str}\n\n Type \`cancel\` to cancel the command`,
                timeout: "You took too long to respond to the command",
                ended: "You exceeded the maximum number of tries",
                cancel: "This command has been cancelled",
                retries: 3
            },
            otherwise: ""
        },
        ignorePermissions: ownerID
    });
    public constructor(config: BotOptions) {
        super({
            ownerID: config.ownerID
        });

        this.config = config;
    }

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listnerHandler);
        this.listnerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listnerHandler: this.listnerHandler,
            process
        });
        await this.commandHandler.loadAll();
        console.log(`[Commands: Command Handler] => Loaded`)
         await this.listnerHandler.loadAll();
        console.log(`[Events: Listener Handler] => Loaded`)

        this.on("ready", async () => {
            const nodes = [{
                    host: "localhost",
                    port: 2333,
                    password: "youshallnotpass"
                }]
            this.lava = new LavaClient(this, nodes, 0)
            this.lava.on( "nodeSuccess", async (node) => {
                console.log ( `[Lavalink ${node.options.port}: LavaJS] => Connected` )
            });
            this.lava.on("nodeClose", async(node, error) => {
                console.log(`[Lavalink ${node}: LavaJS] => Disconnected\n`+ error)
            })
            this.lava.on("nodeError", async(node, error) => {
                console.log(`[Lavalink ${node}: LavaJS] => Errored\n`+ error)
            })
            this.lava.on("nodeReconnect", async(node) => {
                console.log(`[Lavalink ${node}: LavaJS] => Reconnected\n`)
            })
            this.lava.on("createPlayer", async(player) => {
                player.options.textChannel.send(new MessageEmbed()
                    .setAuthor("*Joined Voice Channel and I am ready..*")
                    .setColor("GREEN")
                    .setDescription(`\n
            \`Text Channel\`: ${player.options.textChannel}\n
            \`Voice Channel\`: ${player.options.voiceChannel}\n
            \`Guild Name\`: ${player.options.guild.name}`)
                );
            })
            this.lava.on("destroyPlayer", (player) => {
                player.options.textChannel.send("Ok Bye. I left the Channel....")
            } )
            this.lava.on("trackPlay",async (track, player) => {
                 player.options.textChannel.send(new MessageEmbed()
                    .setAuthor(track.author)
                    .setDescription(`[${track.title}](${track.uri}). Time: ${formatTime(track.length)}\n Requested by ${track.user.user.username}`)
                    .setImage(track.thumbnail.max)
                    .setThumbnail(track.user.user.displayAvatarURL( {dynamic: true} ))
                )
            })
            this.lava.on("trackOver",async (track, player) => {
                player.options.textChannel.send(new MessageEmbed()
                    .setAuthor(track.author)
                    .setDescription(`[${track.title}](${track.uri}).\n Requested by ${track.user.user.username} has end`)
                    .setImage(track.thumbnail.max)
                    .setThumbnail(track.user.displayAvatarURL( {dynamic: true} ))
                )
            })
            this.lava.on("queueOver", async (player) => {
                player.destroy(player.guild)
            })
        });
        this.oauth = new Oauth({
        clientSecret: secret,
            clientId: this.user?.id,
            redirectUri: "http://localhost:8080/api/callback"})
        this.oauthURL = this.oauth.generateAuthUrl({
            scope: ["guilds", "identity"]
        })
        this.db = Database.get();
        await this.db.connect()
            .then(connected => {
            if(connected) console.log("[Database: MongoDB] => Connected")
        }).catch(err => console.log(err))
        await this.db.synchronize();
    }
    public async start(): Promise<string> {
        await this._init();
        return this.login(this.config.token)
    }
}