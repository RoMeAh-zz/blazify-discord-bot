import {Command} from "discord-akairo";
import {Message , TextChannel} from "discord.js";

import {Repository} from "typeorm";
import {Giveaways} from "../../../Lib/Database/Models/Giveaways";
import {GiveawayManager} from "../../../Lib/Structures/GiveawayManager"

export default class GiveawayReroll extends Command{
    public constructor() {
        super ("giveaway-reroll" , {
            aliases: ["gr" , "reroll-giveaway"] ,
            category: "Utility" ,
            description: {
                content: "Rerolls a Giveaway" ,
                usage: "<<gr [ msg id ]" ,
                examples: [
                    "<<gr 516666871471971761171"
                ]
            } ,
            ratelimit: 3 ,
            args: [
                {
                    id: "msg" ,
                    type: async (message : Message , str : string) => {
                        // @ts-ignore
                        return await (message.guild.channels.cache.get (message.channel.id) as TextChannel).messages.fetch ((str) , true)
                            .catch (() => null);
                    } ,
                    prompt: {
                        start: (msg : Message) => `${msg.author}, you must provide a message!` ,
                        retry: (msg : Message) => `${msg.author}, you must provide a valid message!(Hint: This command should be used in the channel in which the giveaway is present)`
                    }
                }
            ]
        });
    }

    public async exec(_message : Message , {msg} : { msg : Message }) : Promise<any> {
        const giveawayRepo : Repository<Giveaways> = this.client.db.getRepository (Giveaways);
            await GiveawayManager.reroll(giveawayRepo , msg)
    }
};