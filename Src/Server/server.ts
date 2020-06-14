import express from "express";
import cors from "cors";
import {json} from "body-parser";
import {readdirSync} from "fs";
import {secret} from "../Config"
import Oauth from "discord-oauth2";
import {AkairoClient} from "discord-akairo";

export default async function Server(client : AkairoClient) {
    const app = express();
    client.oauth = new Oauth({
        clientSecret: secret,
        clientId: client.user!.id,
        redirectUri: "http://localhost:8080/api/callback"
    });
    client.oauthURL = client.oauth.generateAuthUrl({
        scope: ["guilds", "identify"]
    });
    app.use(cors());
    app.use(json());
    app.use(express.static(__dirname + "/../client/dist"));
    readdirSync(__dirname + "/api").forEach((file) => {
        let route: any = [__dirname + `/${file}`];
        route.client = client;
        route.app = app;
        // @ts-ignore
        app[route.path](route.app.bind(client, app));
    })
    app.get("*", (req: any , res: { sendFile: (arg0: any) => void; }) => {
        res.sendFile(require("path").resolve(__dirname + "/../../../Web/client/dist/index.html"));
    });
    let port: number = 8080;
    app.listen(port, () => console.log(`[Web: Server ${port}] => Connected`));
};