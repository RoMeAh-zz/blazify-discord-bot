import {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
  BotOptions,
} from "discord-akairo";
import { Message } from "discord.js";
import { Manager } from "lavaclient";
import { join } from "path";
import { createConnection } from "typeorm";

export class BlazifyClient extends AkairoClient {
  public config: BotOptions;
  public lavaclient: Manager;
  public listnerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, "..", "core/events/"),
  });
  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, "..", "core/commands/"),
    prefix: async (m: Message) => (await m.guild?.entity())?.prefix ?? "b!",
    allowMention: true,
    handleEdits: true,
    commandUtil: true,
    blockBots: true,
    blockClient: true,
    commandUtilLifetime: 3e3,
    defaultCooldown: 6e3,
    argumentDefaults: {
      prompt: {
        modifyStart: (_: Message, prompt: string): string =>
          `${prompt}\n\n Type \`cancel\` to cancel the command`,
        modifyRetry: (_: Message, prompt: string): string =>
          `${prompt}\n\n Type \`cancel\` to cancel the command`,
        timeout: "You took too long to respond to the command",
        ended: "You exceeded the maximum number of tries",
        cancel: "This command has been cancelled",
        retries: 5,
      },
      otherwise: "",
    },
    ignorePermissions: this.ownerID,
  });

  public constructor(config: BotOptions) {
    super({
      ownerID: config.ownerID,
      disableMentions: "everyone",
      shards: "auto",
    });

    this.config = config;
    this.lavaclient = new Manager([this.config.node], {
      shards: this.shard ? this.shard.count : 1,
      send: (id, payload) => {
        const guild = this.guilds.cache.get(id);
        if (guild) return guild.shard.send(payload);
      },
    });
  }

  private async _init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.listnerHandler);
    this.listnerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listnerHandler: this.listnerHandler,
      lavaclient: this.lavaclient,
      ws: this.ws,
      process,
    });

    this.commandHandler.loadAll();
    console.log(`[Commands: Command Handler] => Loaded`);
    this.listnerHandler.loadAll();
    console.log(`[Events: Listener Handler] => Loaded`);

    this.lavaclient.init(process.env.USER_ID);
    await createConnection({
      type: "postgres",
      database: "default",
      synchronize: true,
      entities: [__dirname + "/entity/**/*.js"],
    });
  }

  public async login(): Promise<string> {
    await this._init();
    return await super.login(this.config.token);
  }
}
