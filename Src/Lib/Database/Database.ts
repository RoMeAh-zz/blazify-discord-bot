import { ConnectionManager } from "typeorm";
import { dbName } from "../../Config";

const connectionManager: ConnectionManager = new ConnectionManager();
connectionManager.create({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: dbName,
    entities: [
        __dirname + "/Models/*.js"
    ],
    synchronize: true,
});
export default connectionManager;
