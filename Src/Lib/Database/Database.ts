import { ConnectionManager } from "typeorm";

const connectionManager: ConnectionManager = new ConnectionManager();
connectionManager.create({
    type: "mongodb",
    url: "mongodb+srv://blazify:blazifyisbest@cluster0-pjlza.mongodb.net/blazify",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    entities: [
        __dirname + "/Models/*.js"
    ]
})
export default connectionManager;
