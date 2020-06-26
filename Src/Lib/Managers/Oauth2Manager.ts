import {AkairoClient} from "discord-akairo";
import Oauth from "discord-oauth2";
import {secret} from "../../Config";
import * as crypto from "crypto";
import {Utils} from "..";


export class Oauth2Manager {
    constructor(client: AkairoClient) {

        client.oauth = new Oauth({
            clientSecret: secret,
            clientId: "696756322825404416",
            redirectUri: "http://localhost:8080/api/callback",
            credentials: Utils.encode("696756322825404416" + `:${secret}`)
        })
        client.oauthURL = client.oauth.generateAuthUrl({
            scope: ["identify", "guilds"],
            state: crypto.randomBytes(16).toString("hex"),
        })
    }
}