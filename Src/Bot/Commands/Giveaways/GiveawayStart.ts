import { Command } from "discord-akairo";
import { Message } from "discord.js";
import ms from "ms";

import { Repository } from "typeorm";
import { Giveaways } from "../../../Lib/Database/Models/Giveaways";
import { GiveawayManager }  from "../../../Lib/Structures/GiveawayManager"

export default class GiveawayStart extends Command {
    public constructor() {
        super("giveaway-start", {
            aliases: ["giveaway-start", "start-giveaway"],
            category: "Utility",
            description: {
                content: "Starts a Giveaway",
                usage: "<<gc [ time ] [ prize ]",
                examples: [
                    "<<gc 10m Discord Nitro"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "time" ,
                    type: (msg : Message , str : string) => {
                        return (str ? Number (ms (str)) : null);
                    } ,
                    prompt: {
                        start: (msg : Message) => `${msg.author}, you must provide a time!` ,
                        retry: (msg : Message) => `${msg.author}, you must provide a valid time!`
                    }
                },
                {
                    id: "item",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `${msg.author}. you must provide a item to give away.`
                    }
                }
            ]
        });
    }

    public async exec(message: Message, { time, item }: { time: number , item: string }): Promise<any> {
        const giveawayRepo: Repository<Giveaways> = this.client.db.getRepository(Giveaways);
        const end: number = Date.now() + time;
        await GiveawayManager.start(end, time, item, giveawayRepo, message)
    }
    };