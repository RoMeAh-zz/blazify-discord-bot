import Route from "../lib/Route";
import { Permissions } from "discord.js";
export default class Guilds extends Route {
    constructor() {
        super("/api/guilds");
    }

    async run(client: { oauth: { getUserGuilds: (arg0: string) => Promise<any>; }; guilds: { cache: { has: (arg0: string) => void; }; }; } , app : string , req : { query : { access_token : string; }; } , res: { json: (arg0: { success: boolean; data?: string; }) => Promise<string>; }) {
        if (!req.query.access_token) return res.json({ success: false });
        try {
            let guilds = await client.oauth.getUserGuilds(req.query.access_token);
            guilds = guilds
                .filter((guild: { permissions: Permissions; }) =>
                    new Permissions(guild.permissions).has("MANAGE_GUILD", true)
                )
                .map((guild: { id: string; }) => ({
                    ...guild,
                    manageable: client.guilds.cache.has(guild.id),
                }));
            res.json({ success: true, data: guilds });
        } catch (e) {
            res.json({ success: false });
        }
    }
};