import { ClientOptions } from "discord.js";
import { Manager, SocketData } from "lavaclient";
import { GuildEntity } from "../entity/Guild";
import { MemberEntity } from "../entity/Member";
import { Queue } from "../structures/lavaclient/queue";

declare module "discord.js" {
  interface Guild {
    db: typeof GuildEntity;
    entity(): Promise<GuildEntity | undefined>;
    initDB(options: Partial<GuildEntity> = {}): Promise<void>;
  }

  interface GuildMember {
    db: typeof MemberEntity;
    entity(): Promise<MemberEntity | undefined>;
    initDB(options: Partial<MemberEntity> = {}): Promise<void>;
  }
}

declare module "discord-akairo" {
  interface BotOptions extends ClientOptions {
    token: string;
    ownerID: Array<string>;
    nodes: SocketData[];
  }

  interface AkairoClient {
    commandHandler: CommandHandler;
    listnerHandler: ListenerHandler;
    config: BotOptions;
    lavaclient: Manager;
  }
}

declare module "lavaclient" {
  type Level = "hard" | "medium" | "low" | "none";
  type Repeat = "song" | "queue" | "nothing";
  type Filter = "nightcore" | "slowed" | "default" | "soft" | "trebblebass";
  interface Player {
    queue: Queue;
    bass: Levels;
    repeating: Repeats;
    playerFilter: Filter;
  }
}
