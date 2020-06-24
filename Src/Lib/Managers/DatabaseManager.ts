import Database from "../Database/Database";
import {AkairoClient} from "discord-akairo";

export class DatabaseManager {
    constructor(client: AkairoClient) {
        client.db = Database.get();
        client.db.connect()
            .then(() => {
                client.logger.info("[Database: MongoDB] => Connected")
            }).catch(err => {
                client.logger.error(err)
            })
    }

}