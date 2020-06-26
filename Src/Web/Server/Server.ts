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
    protected server!: Application

    public constructor(client: AkairoClient) {
        this.client = client
    }

    public async start(): Promise<void> {
        this.server = express();
        this.server.use(express.json());
        this.server.use(cors({
            origin: true,
            credentials: true
        }))

        new Auth(this.client, this.server)
        new Callback(this.client, this.server)
        new Config(this.client, this.server)
        new Guild(this.client, this.server)
        new Guilds(this.client, this.server)


        this.server.use(express.static(__dirname + "/../../../Src/Web/Client/dist"))


        this.server.get("*", (req: Request , res: Response) => {
            res.sendFile(require("path").resolve(__dirname + "/../../../Src/Web/Client/dist/index.html"));
        });


        createServer(this.server).listen(8080, (): void => {
            this.client.logger.info("[Server: Express] => Connected").then(r => r);
        })
    }
};