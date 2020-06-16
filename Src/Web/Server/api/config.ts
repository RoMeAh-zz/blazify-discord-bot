import Route from "../lib/Route";
//const ConfigSettings = require("../../Lib/Database/models/configsetting");
//const Prefix = require("../../Lib/Database/models/prefix.js");
module.exports = class extends Route {
    constructor() {
        super("/api/config/:id", "put");
    }

    async run(client: { guilds: { cache: { has: (arg0: any) => any; get: (arg0: any) => any; }; }; oauth: { getUser: (arg0: any) => any; }; } , app : any , req : { params : { id : any; }; query : { access_token : any; type : any; locale : any; }; } , res: { json: (arg0: { success: boolean; data?: { name: any; type: any; } | { name: any; type: any; }; }) => any; }) {
        const { id } = req.params;
        if (!id || !client.guilds.cache.has(id)) return res.json({ success: false });

        const guild = client.guilds.cache.get(id);
        const { access_token, type, locale } = req.query;

        if (!access_token || !type || !locale) return res.json({ success: false });

        const user = await client.oauth.getUser(access_token);
        if (!user || guild.members.cache.has(user))
            return res.json({ success: false });

        const member = guild.member(user.id);
        if (
            !member.hasPermission("MANAGE_GUILD", {
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