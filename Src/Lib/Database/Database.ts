import { ConnectionManager } from "typeorm";
import { mongodburl } from "../../Config";

export let Database: ConnectionManager = new ConnectionManager();
// @ts-ignore
this.db = Database.create({
    type: "mongodb",
    url: mongodburl,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    entities: [
        __dirname + "/Models/*.js"
    ]
}) .connect()
    .then(() => {
        console.log("[Database: MongoDB] => Connected")
    }).catch((err: string) => console.log(err))
