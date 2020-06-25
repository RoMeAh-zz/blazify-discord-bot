import Route from "../lib/Route";
import Guild from "discord.js";
import { AkairoClient } from "discord-akairo";
//const ConfigSettings = require("../../Lib/Database/models/configsetting");
//const Prefix = require("../../Lib/Database/models/prefix.js");
export default class Config extends Route {
    constructor() {
        super("/api/config/:id", "put");
    }

    async run(client: AkairoClient , app : string , req : { params : { id : string; }; query : { access_token : string; type : string; locale : string; }; } , res: { json: (arg0: { success: boolean; data?: { name: string; type: string; } | { name: string; type: string; }; }) => string; }) {
        const { id } = req.params;
        if (!id || !client.guilds.cache.has(id)) return res.json({ success: false });

        const guild = client.guilds.cache.get(id);
        const { access_token, type, locale } = req.query;

        if (!access_token || !type || !locale) return res.json({ success: false });

        const user = await client.oauth.getUser(access_token);
        if (!user || guild?.members?.cache.has(user.id))
            return res.json({ success: false });

        const member = guild?.member(user.id);
        if (
            !member?.hasPermission("MANAGE_GUILD", {
                checkAdmin: true,
                checkOwner: true,
            })
        )
            return res.json({ success: false });

       /* if (locale !== "prefix") {
            let config =
                (await ConfigSettings.findOne({ guildID: guild.id })) ||
                new ConfigSettings({
                    guildID: guild.id,
                });
            config["enable" + locale] = type !== "disable";
            config.save();
            return res.json({
                success: true,
                data: { name: locale, type: config["enable" + locale] },
            });
        }

        const prefix =
            (await Prefix.findOne({ guildID: guild.id })) ||
            new Prefix({
                guildID: guild.id,
                prefix: type,
            });

        prefix.prefix = type;
        prefix.save();
        return res.json({ success: true, data: { name: locale, type } });
    */}
}