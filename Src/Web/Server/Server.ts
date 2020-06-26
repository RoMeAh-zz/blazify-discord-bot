import express, {Application, Request, Response} from "express";
import cors from "cors";
import { AkairoClient } from "discord-akairo";
import { createServer } from "http";


export default class Server {
    protected client!: AkairoClient;
    protected server!: Application

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
            res.sendFile(require("path").resolve(__dirname + "/../Client/dist/index.html"));
        });


        createServer(this.server).listen(8080, (): void => {
            this.client.logger.info("[Server: Express] => Connected").then(r => r)
        })
    }
};