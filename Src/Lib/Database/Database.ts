import { ConnectionManager} from "typeorm";
import {mongodburl} from "../../Config";

let Database: ConnectionManager = new ConnectionManager()
Database.create({
    type: "mongodb",
    url: mongodburl,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    entities: [__dirname + "/Models/*.js"]
})
export default Database;