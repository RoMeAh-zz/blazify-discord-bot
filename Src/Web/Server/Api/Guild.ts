import { Snowflake} from "discord.js";
import {AkairoClient} from "discord-akairo";
import {Application, Request, Response, Router} from "express";
import { GuildSettings } from "../../../Lib";
import {Column, Repository} from "typeorm";
import {stringify} from "querystring";

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
            let config: GuildSettings = await ConfigSettings.findOne({guild: guild.id});
            const data = {guild: {...guild, iconURL: guild.iconURL()}, config};
            return res.json({success: true, data});
        })
    }
};