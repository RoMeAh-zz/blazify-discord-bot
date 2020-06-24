import Database from "../Database/Database";
import {AkairoClient} from "discord-akairo";

export class DatabaseManager {
    constructor(client: AkairoClient) {
        client.db = Database.get();
        client.db.connect()
            .then(() => {
                console.log("[Database: MongoDB] => Connected")
            }).catch(console.error)
    }

}