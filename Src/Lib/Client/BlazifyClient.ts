import {AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler} from "discord-akairo";
import { Message } from "discord.js";
import { join } from "path";
import { ownerID } from "../../Config";
import {Connection} from "typeorm"
import Oauth from "discord-oauth2";
import {DatabaseManager, LavaJSManager, Oauth2Manager, Logger} from ".."
import { LavaClient } from "@anonymousg/lavajs";

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler
        listnerHandler: ListenerHandler
        db: Connection;
        lava: LavaClient;
        oauth: Oauth;
        oauthURL: string;
        prefix: string;
        logger: Logger
    }
}
interface BotOptions{
    token? : string
    ownerID? : string | Array<string>
}

export class BlazifyClient extends AkairoClient {
    public config: BotOptions;
    public db!: Connection;
    public lava!: LavaClient;
    public oauth!: Oauth;
    public oauthURL!: string;
    public prefix!: string;
    public logger!: Logger
    public listnerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "..", "Bot/Events/")
    })
    public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
        directory: join(__dirname, "..", "..", "Bot/Inhibitors/")
    })
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "..", "Bot/Commands/"),
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        blockBots: true,
        blockClient: true,
        commandUtilLifetime: 3e4,
        defaultCooldown: 6e4,
        argumentDefaults: {
            prompt: {
                modifyStart: (_:Message, prompt: string): string => `${prompt}\n\n Type \`cancel\` to cancel the command`,
                modifyRetry: (_:Message, prompt: string): string => `${prompt}\n\n Type \`cancel\` to cancel the command`,
                timeout: "You took too long to respond to the command",
                ended: "You exceeded the maximum number of tries",
                cancel: "This command has been cancelled",
                retries: 5
            },
            otherwise: ""
        },
        ignorePermissions: ownerID
    });
    public constructor(config: BotOptions) {
        super({
            ownerID: config.ownerID,
            disableMentions: "everyone"
        });

        this.config = config;
    }

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listnerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.listnerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listnerHandler: this.listnerHandler,
            process
        });
        this.logger = new Logger();

        this.inhibitorHandler.loadAll();
        await this.logger.info(`[Inhibitor: Inhibitor Handler] => Loaded`)
        this.commandHandler.loadAll();
        await this.logger.info(`[Commands: Command Handler] => Loaded`)
         this.listnerHandler.loadAll();
        await this.logger.info(`[Events: Listener Handler] => Loaded`)
        
        new LavaJSManager(this)
        new Oauth2Manager(this)
        new DatabaseManager(this)

    }
    public async start(): Promise<string> {
        await this._init();
        return this.login(this.config.token)
    }
}