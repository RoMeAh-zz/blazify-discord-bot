import Route from "../lib/Route";
import { Permissions } from "discord.js";
module.exports = class extends Route {
    constructor() {
        super("/api/guilds");
    }

    async run(client: { oauth: { getUserGuilds: (arg0: any) => any; }; guilds: { cache: { has: (arg0: any) => any; }; }; } , app : any , req : { query : { access_token : any; }; } , res: { json: (arg0: { success: boolean; data?: any; }) => void; }) {
        if (!req.query.access_token) return res.json({ success: false });
        try {
            let guilds = await client.oauth.getUserGuilds(req.query.access_token);
            // @ts-ignore
            guilds = guilds
                .filter((guild: { permissions: any; }) =>
                    new Permissions(guild.permissions).has("MANAGE_GUILD", true)
                )
                .map((guild: { id: any; }) => ({
                    ...guild,
                    manageable: client.guilds.cache.has(guild.id),
                }));
            res.json({ success: true, data: guilds });
        } catch (e) {
            res.json({ success: false });
        }
    }
};