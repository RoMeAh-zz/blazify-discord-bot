import { ConnectionManager } from "typeorm";
import { Giveaways } from "./Models/Giveaways";
import { Warns } from "./Models/Warns";

const connectionManager: ConnectionManager = new ConnectionManager();
connectionManager.create({
    type: "mongodb",
    url: "mongodb+srv://blazify:blazifyisbest@cluster0-pjlza.mongodb.net/blazify",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    entities: [
        Giveaways,
        Warns
    ]
})
export default connectionManager;
