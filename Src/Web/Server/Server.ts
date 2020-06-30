import express, {Application, Request, Response} from "express";
import cors from "cors";
import { AkairoClient } from "discord-akairo";
import { createServer } from "http";
import Auth from "./Api/Auth";
import Callback from "./Api/Callback";
import Config from "./Api/Config";
import Guild from "./Api/Guild";
import Guilds from "./Api/Guilds";


export default class Server {
    protected client!: AkairoClient;
    protected app!: Application

    public constructor(client: AkairoClient) {
        this.client = client
    }

    public async start(): Promise<void> {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors({
            origin: true,
            credentials: true
        }))

        new Auth(this.client, this.app)
        new Callback(this.client, this.app)
        new Config(this.client, this.app)
        new Guild(this.client, this.app)
        new Guilds(this.client, this.app)


        this.app.use(express.static(__dirname + "/../../../Src/Web/Client/dist"))


        this.app.get("*", (req: Request , res: Response) => {
            res.sendFile(require("path").resolve(__dirname + "/../../../Src/Web/Client/dist/index.html"));
        });


        createServer(this.app).listen(8080, (): void => {
            this.client.logger.info("[Server: Express] => Connected").then(r => r);
        })
    }
};