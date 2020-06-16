import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { secret } from "../../Config"
import Oauth from "discord-oauth2";
import { AkairoClient } from "discord-akairo";

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
    app.use(express.static(__dirname + "/api"))

    app.get("*", (req: any , res: { sendFile: (arg0: any) => void; }) => {
        res.sendFile(require("path").resolve(__dirname + "/../client/dist/index.html"));
    });
    let port: number = 8080;
    app.listen(port, () => console.log(`[Web: Server ${port}] => Connected`));
};