import "reflect-metadata";
import "./lib/structures/lavaclient/player";
import "./lib/structures/discord.js/Guild";
import "./lib/structures/discord.js/Member";

import { config } from "dotenv";
import { BlazifyClient } from "./lib/BlazifyClient";

config();
new BlazifyClient({
  token: process.env.TOKEN,
  ownerID: process.env.OWNER_ID.split(", "),
  node: {
    id: process.env.LAVALINK_ID,
    host: process.env.LAVALINK_HOST,
    port: Number(process.env.LAVALINK_PORT),
    password: process.env.LAVALINK_PASSWORD,
  },
}).login();
