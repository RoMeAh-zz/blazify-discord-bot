import { Permissions } from "discord.js";
import {AkairoClient} from "discord-akairo";
import {Application, Request, Response, Router} from "express";
export default class Guilds {
    protected client: AkairoClient
    protected router: Router
    protected app: Application
    public constructor(client: AkairoClient, app: Application) {
        this.app = app;
        this.client = client;
        this.router = Router()
        this.app.use(this.router)

        this.router.get("/api/guilds", async(req: Request, res: Response) => {
            if (!req.query.access_token) return res.json({success: false});
            try {
                let guilds: any[] = await client.oauth.getUserGuilds(<string>req.query.access_token);
                guilds = guilds
                    .filter((guild: { permissions: Permissions; }) =>
                        new Permissions(guild.permissions).has("MANAGE_GUILD", true)
                    )
                    .map((guild: { id: string; }) => ({
                        ...guild,
                        manageable: client.guilds.cache.has(guild.id),
                    }));
                res.json({success: true, data: guilds});
            } catch (e) {
                res.json({success: false});
            }
        })
    }
};