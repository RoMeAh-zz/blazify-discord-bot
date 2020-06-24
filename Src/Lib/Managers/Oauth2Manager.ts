import {AkairoClient} from "discord-akairo";
import Oauth from "discord-oauth2";
import {secret} from "../../Config";


export class Oauth2Manager {
    constructor(client: AkairoClient) {
        client.oauth = new Oauth({
            clientSecret: secret,
            clientId: client.user?.id,
            redirectUri: "http://localhost:8080/api/callback"
        })
        client.oauthURL = client.oauth.generateAuthUrl({
            scope: ["guilds", "identity"]
        })
    }

}