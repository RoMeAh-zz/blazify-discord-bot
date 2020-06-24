import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { Message } from "discord.js";
import { join } from "path";
import { ownerID } from "../../Config";
import {Connection} from "typeorm"
import Oauth from "discord-oauth2";
import {DatabaseManager, LavaJSManager, Oauth2Manager} from ".."

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler
        listnerHandler: ListenerHandler
        db: Connection;
        lava: LavaJSManager;
        oauth: Oauth;
        oauthURL: string;
        prefix: string;
    }
}
interface BotOptions{
    token? : string
    ownerID? : string | Array<string>
}

export class BlazifyClient extends AkairoClient {
    public config: BotOptions;
    public db!: Connection;
    public lava!: LavaJSManager;
    public oauth!: Oauth;
    public oauthURL!: string;
    public prefix!: string;
    public listnerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "..", "Bot/Events/")
    })
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "..", "Bot/Commands/"),
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
        
        new LavaJSManager(this)
        new Oauth2Manager(this)
        new DatabaseManager(this)

    }
    public async start(): Promise<string> {
        await this._init();
        return this.login(this.config.token)
    }
}