import { Listener } from "discord-akairo";
import { TextChannel, Message } from "discord.js";
import { Repository } from "typeorm";
import { Giveaways } from "../../../Lib";
import  Server  from "../../../Web/Server/Server"

import  { GiveawayManager }  from "../../../Lib";
import { GuildSettings } from "../../../Lib";
export default class ReadyListener extends Listener {
    public constructor() {
        super ("ready" , {
            emitter: "client" ,
            event: "ready" ,
            category: "client"
        })
    }

    public async exec() : Promise<void> {
        await new Server(this.client).start()
        const giveawayRepo : Repository<Giveaways> = this.client.db.getRepository (Giveaways);
        const guildSetting: Repository<GuildSettings> =  this.client.db.getRepository(GuildSettings)
        this.client.logger.info (`[Discord Bot: Blazify] => Connected`);

        
        let allGuilds = this.client.guilds.cache.array();

        for (let i = 0; i < allGuilds.length; i++) {


            let exists = await guildSetting.findOne({guild: allGuilds[i].id})

        if(!exists) {

        await guildSetting.insert({
            
        guild: allGuilds[i].id,
        prefix: "b3",
        enableXPCoins: false,
        enableXP: false,
        enableCaptcha: false,
        enableVerification: false,
        enableAntiSpam: true,
        enableModeration: true,
        enableFun: true,
        enableGiveaway: true,
        enableEconomy: true,
        enableMusic: true,
        enableGaming: true,
        enableUtility: true,
        enableWelcome: false,
        logChannel: "logs",
        reportChannel: "reports",
        welcomeChannel: "welcome",
        welcomeMessage: "${member.name} Welcome to ${message.guild.name}.",
        leaverChannel: "leavers",
        leaverMessage: "${member.user.tag} Betrayed ${message.guild.name}.",
        verifyChannel: "verify",
        verifyRole: "Verified"

        })

        this.client.logger.info(`${allGuilds[i].name} guild has been added to database`)
    }
    }
        setInterval (async () => {
            const giveaways : Giveaways[] = await giveawayRepo.find ();
            giveaways.filter (g => g.end!  <= Date!.now()).map (async g => {
                const msg = await (this.client.channels.cache.get (g.channel!) as TextChannel).messages.fetch(g.message!, true)
                    .catch (() => null);
                if (! msg) return giveawayRepo.delete (g);
                await GiveawayManager.end (giveawayRepo , msg)
            });
        } , 3e5)
    }
}