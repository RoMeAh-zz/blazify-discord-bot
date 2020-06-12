import { Listener } from "discord-akairo";
import { TextChannel, Message } from "discord.js";
import { Repository } from "typeorm";
import { Giveaways } from "../../../Lib/Database/Models/Giveaways";

import  { GiveawayManager }  from "../../../Lib/Structures/GiveawayManager";
import { channel_id, discord_channel, ytwatchInterval, messageTemplate } from "../../../Config";
import { handleUploads } from "../../../Lib/Structures/YouTubeVideoNotifier"
export default class ReadyListener extends Listener {;
    public constructor() {
        super ("ready" , {
            emitter: "client" ,
            event: "ready" ,
            category: "client"
        })
    }

    public async exec() : Promise<void> {
        const giveawayRepo : Repository<Giveaways> = this.client.db.getRepository (Giveaways);

        console.log (`${this!.client!.user!.tag} is online and ready`);

        setInterval (async () => {
            const giveaways : Giveaways[] = await giveawayRepo.find ();
            giveaways.filter (g => g.end <= Date.now ()).map (async g => {
                // @ts-ignore
                const msg : Message = await (this.client.channels.cache.get (g.channel) as TextChannel).messages.fetch ()
                    .catch (() => null);
                if (! msg) return giveawayRepo.delete (g);
                await GiveawayManager.end (giveawayRepo , msg)
            });
        } , 3e5)
        handleUploads(this.client, channel_id, discord_channel, ytwatchInterval, messageTemplate)
    }
}