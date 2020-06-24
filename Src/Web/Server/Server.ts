import express, { Application } from "express";
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
        this.callback = new Callback
        this.authorization = new Auth
        this.config = new Config
        this.Guild = new Guild
        this.Guilds = new Guilds
    }

    public start(): void {
        this.server = express();
        this.server.use(express.json());
        this.server.use(cors({
            origin: true,
            credentials: true
        }))
        new Config;
        new Guild;
        new Callback;
        new Auth;
        new Guilds;
        createServer(this.server).listen(8080, (): void => {
            this.client.logger.info("[Server: Express] => Connected")
        })
    }
};