import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import {Message , MessageEmbed} from "discord.js";
import { join } from "path";
import {prefix , ownerID , secret} from "../../Config";
import { Connection } from "typeorm"
import Database  from "../Database/Database"
import Oauth from "discord-oauth2";
import LavaJS  from "../Structures/LavaJS"
import { LavaClient } from "@anonymousg/lavajs";
import { formatTime } from "../Structures/formatTime";


declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler
        listnerHandler: ListenerHandler
        db: Connection;
        lava: LavaJS;
        oauth: Oauth;
        oauthURL: any;
        commands: any;
    }
}
interface BotOptions{
    token? : string
    ownerID? : string | Array<string>
}


export default class BlazifyClient extends AkairoClient {
    public config: BotOptions;
    public db!: Connection;
    public lava!: LavaJS;
    public oauth!: Oauth;
    public oauthURL!: any;
    public commands!: any;
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
        
        this.lava = new LavaJS(this)

        this.commands = this.commandHandler.categories.map;
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