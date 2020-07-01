import { Snowflake} from "discord.js";
import {AkairoClient} from "discord-akairo";
import {Application, Request, Response, Router} from "express";
import { GuildSettings } from "../../../Lib";
import {Column, Repository} from "typeorm";
import {stringify} from "querystring";
import ts from "typescript/lib/tsserverlibrary";
import emptyArray = ts.server.emptyArray;

export default class {
    protected client: AkairoClient
    protected router: Router
    protected app: Application
    public constructor(client: AkairoClient, app: Application) {
        this.app = app;
        this.client = client;
        this.router = Router()
        this.app.use(this.router)


        this.router.get("/Api/guild", async (req: Request, res: Response) => {
            if (!req.query.id || !req.query.access_token)
                return res.json({success: false});

            const guild = client.guilds.cache.get(<Snowflake>req.query.id);
            const user = await client.oauth.getUser(<string>req.query.access_token);

            if (!user || !(await guild).members.cache.has(user.id))
                return res.json({success: false});

            const member = (await guild).members.cache.get(user.id);
            if (
                !member?.hasPermission("MANAGE_GUILD", {
                    checkAdmin: true,
                    checkOwner: true,
                })
            )
                return res.json({success: false});
            let ConfigSettings: Repository<GuildSettings> = client.db.getRepository(GuildSettings)
            let config: any = await ConfigSettings.findOne({guild: guild.id});

                let cfg1 = ["enableXPCoins", config.enableXPCoins]
                let cfg2 = ["enableXP", config.enableXP]
                let cfg3 = ["enableCaptcha", config.enableCaptcha]
                let cfg4 = ["enableVerification", config.enableVerification]
                let cfg5 = ["enableAntiSpam", config.enableAntiSpam]
                let cfg6 = ["enableModeration", config.enableModeration]
                let cfg7 = ["enableFun", config.enableFun]
                let cfg8 = ["enableGiveaway", config.enableGiveaway]
                let cfg9 = ["enableEconomy", config.enableEconomy]
                let cfg10 = ["enableMusic", config.enableMusic]
                let cfg11 = ["enableUtility", config.enableUtility]
                let cfg12 = ["enableWelcome", config.enableWelcome]

            config = Object.values({cfg1, cfg2, cfg3, cfg4, cfg5, cfg6, cfg7, cfg8, cfg9, cfg10, cfg11, cfg12})
            console.log(config)
            const data = {guild: {...guild, iconURL: guild.iconURL()}, config};
            return res.json({success: true, data});
        })
    }
};