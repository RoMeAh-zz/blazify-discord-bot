import express, {Application, Request, Response} from "express";
import cors from "cors";
import { AkairoClient } from "discord-akairo";
import Callback from "./api/Callback";
import Guild from "./api/Guild";
import Auth from "./api/Auth";
import Config from "./api/Config";
import Guilds from "./api/Guilds";
import { createServer } from "http";


export default class Server {
    protected client!: AkairoClient;
    protected server!: Application
    protected callback!: Callback;
    protected authorization!: Auth;
    protected config!: Config;
    protected Guild!: Guild;
    protected Guilds!: Guilds;

    public constructor(client: AkairoClient) {
        this.client = client
    }

    public start(): void {
        this.server = express();
        this.server.use(express.json());
        this.server.use(cors({
            origin: true,
            credentials: true
        }))


        this.server.use(express.static(__dirname + "/api"))
        this.server.use(express.static(__dirname + "../Client/dist"))


        this.server.get("*", (req: Request , res: Response) => {
            res.sendFile(require("path").resolve(__dirname + "/../Client/dist/index.html"));	        res.sendFile(require("path").resolve(__dirname + "/../../../Web/client/dist/index.html"));
        });


        createServer(this.server).listen(8080, (): void => {
            this.client.logger.info("[Server: Express] => Connected").then(r => r)
        })
    }
};