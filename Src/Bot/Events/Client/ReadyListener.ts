import { Listener } from "discord-akairo";
import { TextChannel, Message } from "discord.js";
import { Repository } from "typeorm";
import { Giveaways } from "../../../Lib/Database/Models/Giveaways";

import { LavaClient } from "@anonymousg/lavajs";

import  { GiveawayManager }  from "../../../Lib/Structures/GiveawayManager";
export default class ReadyListener extends Listener {
    public constructor() {
        super ("ready" , {
            emitter: "client" ,
            event: "ready" ,
            category: "client"
        })
    }

    public async exec() : Promise<void> {
        const nodes = [
            {
                host: "localhost",
                port: 2333,
                password: "youshallnotpass"
            }
        ]

         // @ts-ignore
        this.client.music = new LavaClient(this.client, nodes, 0)


        const giveawayRepo : Repository<Giveaways> = this.client.db.getRepository (Giveaways);

        console.log (`[Bot: Blazify] => Connected`);

        setInterval (async () => {
            const giveaways : Giveaways[] = await giveawayRepo.find ();
            giveaways.filter (g => g.end!  <= Date!.now()).map (async g => {
                // @ts-ignore
                const msg : Message = await (this.client.channels.cache.get (g.channel) as TextChannel).messages.fetch ()
                    .catch (() => null);
                if (! msg) return giveawayRepo.delete (g);
                await GiveawayManager.end (giveawayRepo , msg)
            });
        } , 3e5)


    }
}