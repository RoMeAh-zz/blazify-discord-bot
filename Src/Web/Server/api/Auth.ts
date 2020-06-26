import {AkairoClient} from "discord-akairo";
import {Application, Request, Response, Router} from "express";

export default class Auth {
    protected client: AkairoClient
    protected router: Router
    protected app: Application
    public constructor(client: AkairoClient, app: Application) {
        this.app = app;
        this.client = client;
        this.router = Router()
        this.app.use(this.router)

        this.router.get("/api/auth", (req: Request, res: Response) => {
            res.json({success: true, redirect: client.oauthURL});
        })
    }
};