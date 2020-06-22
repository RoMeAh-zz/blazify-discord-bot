import { ConnectionManager } from "typeorm";
import { mongodburl } from "../../Config";

const connectionManager: ConnectionManager = new ConnectionManager();
export default connectionManager.create({
    type: "mongodb",
    url: mongodburl,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    entities: [
        __dirname + "/Models/*.js"
    ]
})