import { AkairoClient } from "discord-akairo";
import {Application, Request, Response, Router} from "express";

export default class Callback {
    protected client: AkairoClient
    protected router: Router
    protected app: Application
    public constructor(client: AkairoClient, app: Application) {
        this.app = app;
        this.client = client;
        this.router = Router()
        this.app.use(this.router)

        this.router.get("/api/callback", async (req: Request, res: Response) => {
            const { code } = req.query;
            console.log(code)
            if (!code || typeof code !== "string") return res.json({success: false, error: "Code not found!"});
            try {
                await this.client.oauth.tokenRequest({
                    code: code,
                    scope: "identify guilds",
                    grantType: "authorization_code"
                }).then((token) => {
                    console.log(token)
                    res.redirect(
                        `/dashboard?access_token=${token.access_token}&refresh_token=${token.refresh_token}`
                    );
                })
            } catch (e) {
                console.log(e)
                res.redirect(
                    client.oauth.generateAuthUrl({scope: ["identify", "guilds"]})
                );
            }

        })
    }
    };