import { Snowflake} from "discord.js";
import {AkairoClient} from "discord-akairo";
import {Application, Request, Response, Router} from "express";
import { GuildSettings } from "../../../Lib";
import {Repository} from "typeorm";

export default class {
    protected client: AkairoClient
    protected router: Router
    protected app: Application
    public constructor(client: AkairoClient, app: Application) {
        this.app = app;
        this.client = client;
        this.router = Router()
        this.app.use(this.router)


        this.router.get("/api/guild", async (req: Request, res: Response) => {
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
            let config: GuildSettings = await ConfigSettings.findOne({guild: guild.id});
            const {filter} = Object.entries(Object.values(config)[3]);
            // @ts-ignore
            config = filter((x) => {
                x[0].startsWith("enable")
            });


            const data = {guild: {...guild, iconURL: guild.iconURL()}, config};
            return res.json({success: true, data});
        })
    }
};