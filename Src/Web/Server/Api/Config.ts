import { AkairoClient } from "discord-akairo";
import {Application, Request, Response, Router} from "express";
import { GuildSettings } from "../../../Lib";
import {InsertResult, Repository} from "typeorm";
import {isBoolean} from "util";


export default class Config {
    protected client: AkairoClient
    protected router: Router
    protected app: Application
    public constructor(client: AkairoClient, app: Application) {
        this.app = app;
        this.client = client;
        this.router = Router()
        this.app.use(this.router)

        this.router.get("/api/config/:id", async(req: Request, res: Response) => {
            const {id} = req.params;
            if (!id || !client.guilds.cache.has(id)) {
                return res.json({success: false});
            }

            const guild = client.guilds.cache.get(id);
            let {access_token, type, locale} = req.query;
            console.log(access_token)
            console.log(type)
            console.log(locale)

            if (typeof access_token !== "string" || !type || !locale) {
                console.log("fock")
                return res.json({success: false});
            }
                let user = await client.oauth.getUser(access_token)
            console.log(user)
                if (!user || !guild?.members?.cache.has(user.id)) {
                    console.log("sock")
                    return res.json({success: false});
                }
                const member = guild?.member(user.id);
                if (!member?.hasPermission("MANAGE_GUILD", {
                    checkAdmin: true,
                    checkOwner: true,
                })) {
                    console.log(":(")
                    return res.json({success: false});
                }
            let ConfigSettings: Repository<GuildSettings> = client.db.getRepository(GuildSettings)
            if (locale !== "prefix") {
                let config = await ConfigSettings.findOne({guild: guild.id})
                let state: boolean = false;
                if(type === "true") state = true
                config["enable" + locale] = state
                await ConfigSettings.save(config)
                console.log(config)
                return res.json({
                    success: true,
                    data: {name: locale, type: config["enable" + locale]},
                });
            } else if(locale === "prefix" && typeof type === "string") {
            const prefix = await ConfigSettings.findOne({guild: guild.id})
                 prefix["prefix"] = type;
            await ConfigSettings.save(prefix)

            return res.json({success: true, data: {name: locale, type}});
        }
    })
        }
    }