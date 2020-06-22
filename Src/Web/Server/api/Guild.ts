import Route from "../lib/Route";
//const ConfigSettings = require("../../Lib/Database/models/configsetting");

export default class extends Route {
    constructor() {
        super("/api/guild");
    }

    async run(client: { guilds: { cache: { get: (arg0: any) => any; }; }; oauth: { getUser: (arg0: any) => any; }; } , app : any , req : { query : { id : any; access_token : any; }; } , res: { json: (arg0: { success: boolean; data?: { guild: any; config: any; }; }) => any; }) {
        if (!req.query.id || !req.query.access_token)
            return res.json({ success: false });

        const guild = client.guilds.cache.get(req.query.id);
        const user = await client.oauth.getUser(req.query.access_token);

        if (!user || !guild.members.cache.has(user.id))
            return res.json({ success: false });

        const member = guild.members.cache.get(user.id);
        if (
            !member.hasPermission("MANAGE_GUILD", {
                checkAdmin: true,
                checkOwner: true,
            })
        )
            return res.json({ success: false });

        /*let config = await ConfigSettings.findOne({ guildID: guild.id });
        // @ts-ignore
        const {filter} = Object.entries ( Object.values ( config )[3] );
        config = filter((x: string[]) =>
            x[0].startsWith("enable")
        );


        const data = { guild: { ...guild, iconURL: guild.iconURL() }, config };
        return res.json({ success: true, data });
*/
    }
};