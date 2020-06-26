import { Listener } from "discord-akairo";
import { TextChannel, Message } from "discord.js";
import { Repository } from "typeorm";
import {Giveaways, UserGuild, User} from "../../../Lib";
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
        const giveawayRepo : Repository<Giveaways> = this.client.db.getRepository (Giveaways);
        const guildSetting: Repository<GuildSettings> =  this.client.db.getRepository(GuildSettings)
        await this.client.logger.info(`[Discord Bot: Blazify] => Connected`);

        
        let allGuilds = this.client.guilds.cache.array();
        let allUsers = this.client.users.cache.array();

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

        await this.client.logger.info(`${allGuilds[i].name} guild has been added to database`)
    }
        for(let u = 0; u < allUsers.length; u++) {
            const GUser: Repository<UserGuild> = this.client.db.getRepository(UserGuild)
            let guser = await GUser.findOne({user: allUsers[u].id, guild: allGuilds[i].id})
            if(!guser) {
                await GUser.insert({
                    user: allUsers[u].id,
                    guild: allGuilds[i].id,
                    xp: 0,
                    level: 1,
                    xpcoins: 0,
                    banned: 0,
                    kicked: 0
                })
                await this.client.logger.info(`${allUsers[u].id} has been added to the GuildUser Database`)
            }
        const UUser: Repository<User> = this.client.db.getRepository(User)
            let uuser = UUser.findOne({ user: allUsers[u].id })
            if(!uuser) {
                await UUser.insert({
                    user: allUsers[i].id,
                    coins: 0,
                    items: [],
                    blacklisted: false
                })
                await this.client.logger.info(`${allUsers[u].id} has been added to the User Database`)
            }
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