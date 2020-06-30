import { AkairoClient } from "discord-akairo";
import {Application, Request, Response, Router} from "express";
import { GuildSettings } from "../../../Lib";
import {InsertResult, Repository} from "typeorm";


export default class Config {
    protected client: AkairoClient
    protected router: Router
    protected app: Application
    public constructor(client: AkairoClient, app: Application) {
        this.app = app;
        this.client = client;
        this.router = Router()
        this.app.use(this.router)

        this.router.get("/Api/config/:id", async(req: Request, res: Response) => {
            const {id} = req.params;
            if (!id || !client.guilds.cache.has(id)) {
                return res.json({success: false});
            }

            const guild = client.guilds.cache.get(id);
            const {access_token, type, locale} = req.query;
            let enable = "enable" + locale;

            if (typeof access_token !== "string" || typeof type !== "string"|| !locale) {
                return res.json({success: false});
            }
                let [user] = await Promise.all([client.oauth.getUser(access_token)]);
                if (!user || guild?.members?.cache.has(user.id))
                    return res.json({success: false});
                const member = guild?.member(user.id);
                if (!member?.hasPermission("MANAGE_GUILD", {
                    checkAdmin: true,
                    checkOwner: true,
                }))
                    return res.json({success: false});
            let ConfigSettings: Repository<GuildSettings> = client.db.getRepository(GuildSettings)
            if (locale !== "prefix") {
                let config =
                    (await ConfigSettings.findOne({guild: guild.id}))
                let ok = config[0].enable = type;
                console.log(ok)
                return res.json({
                    success: true,
                    data: {name: locale, type: config["enable" + locale]},
                });
            }

            const prefix =
                (await ConfigSettings.findOne({guild: guild.id})) ||
                await ConfigSettings.insert({
                    guild: guild.id,
                    prefix: type,
                });
            if (!(prefix instanceof InsertResult)) {
                prefix.prefix = type;
            }
            return res.json({success: true, data: {name: locale, type}});
        })
        }
    }