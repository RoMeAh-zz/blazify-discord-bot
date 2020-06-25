import {Command} from "discord-akairo";
import {Message , TextChannel} from "discord.js";

import {Repository} from "typeorm";
import {Giveaways} from "../../../Lib";
import {GiveawayManager} from "../../../Lib"

export default class GiveawayDelete extends Command{
    public constructor() {
        super ("giveaway-delete" , {
            aliases: ["giveaway-delete" , "delete-giveaway"] ,
            category: "Utility" ,
            description: {
                content: "Edits a Giveaway" ,
                usage: "<<gd [ msg id ]" ,
                examples: [
                    "<<gd 531531234545410"
                ]
            } ,
            ratelimit: 3 ,
            args: [
                {
                    id: "msg" ,
                    type: async (message : Message , str : string) => {
                        return await (message.guild?.channels.cache.get (message.channel.id) as TextChannel).messages.fetch ((str) , true)
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

    public async exec(_message : Message , {msg} : { msg : Message }) : Promise<Message> {
        const giveawayRepo : Repository<Giveaways> = this.client.db.getRepository (Giveaways);
         await GiveawayManager.delete(giveawayRepo, msg)
        return _message.util!.send("Deleted Message from Channel and Database")
    }
};