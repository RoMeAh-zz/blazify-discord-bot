import Route from "../lib/Route";
import { AkairoClient } from "discord-akairo";
export default class extends Route {
    constructor() {
        super("/api/callback");
    }

    async run(client: AkairoClient, app : string , req : { query : { code : string; }; } , res: { json: (arg0: { success: boolean; error: string; }) => void; redirect: (arg0: string) => void; }) {
        const { code } = req.query;
        if (!code) return res.json({ success: false, error: "Code not found!" });
        let token;
        try {
            token = await client.oauth.tokenRequest({
                code,
                scope: "identify guilds",
                grantType: "authorization_code",
            });
        } catch (e) {
            res.redirect(
                await client.oauth.generateAuthUrl({ scope: ["identify", "guilds"] })
            );
        }
        if (!token || !token.access_token)
            return res.json({
                success: false,
                error: "Couldn't get the access token!",
            });
        res.redirect(
            `/dashboard?access_token=${token.access_token}&refresh_token=${token.refresh_token}`
        );
    }
};