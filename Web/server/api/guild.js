const Route = require("../lib/Route");
const ConfigSettings = require("../../../models/configsetting");

module.exports = class extends Route {
    constructor() {
        super("/api/guild");
    }

    async run(bot, app, req, res) {
        if (!req.query.id || !req.query.access_token)
            return res.json({success: false});
        const guild = bot.guilds.cache.get(req.query.id);
        const user = await bot.oauth.getUser(req.query.access_token);
        if (!user || !guild.members.cache.has(user.id))
            return res.json({success: false});
        const member = guild.members.cache.get(user.id);
        if (
            !member.hasPermission("MANAGE_GUILD", {
                checkAdmin: true,
                checkOwner: true,
            })
        )
            return res.json({success: false});

        let config = await ConfigSettings.findOne({guildID: guild.id});
        config = Object.entries(Object.values(config)[3]).filter(x => x[0].startsWith("enable"));
        const data = {guild: {...guild, iconURL: guild.iconURL()}, config};
        return res.json({success: true, data});
    }
}
