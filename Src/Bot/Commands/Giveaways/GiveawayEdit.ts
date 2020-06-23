import {Command} from "discord-akairo";
import {Message , TextChannel} from "discord.js";
import ms from "ms";

import {Repository} from "typeorm";
import {Giveaways} from "../../../Lib";
import {GiveawayManager} from "../../../Lib"

export default class GiveawayEnd extends Command {
    public constructor() {
        super("giveaway-edit", {
            aliases: ["giveaway-edit", "edit-giveaway"],
            category: "Utility",
            description: {
                content: "Edits a Giveaway",
                usage: "<<ge [ msg ID ] [ time ] [ prize ]",
                examples: [
                    "<<gc 531531234545410m Discord Nitro"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "msg",
                    type: async (message : Message , str : string) => {
                            // @ts-ignore
                        return await (message.guild.channels.cache.get ( message.channel.id ) as TextChannel).messages.fetch ( (str) , true )
                                .catch ( () => null );
                    },
                    prompt: {
                        start: (msg : Message) => `${msg.author}, you must provide a message!` ,
                        retry: (msg : Message) => `${msg.author}, you must provide a valid message!(Hint: This command should be used in the channel in which the giveaway is present)`
                    }
                },
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

    public async exec(message: Message, { time, item, msg }: { time: number, item: string, msg: Message}): Promise<any> {
        const giveawayRepo: Repository<Giveaways> = this.client.db.getRepository(Giveaways);
        const end: number = Date.now() + time;
        await GiveawayManager.edit(end, time, item, giveawayRepo, msg)
    }
};