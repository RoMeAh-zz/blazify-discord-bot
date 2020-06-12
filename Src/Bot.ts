import { token, ownerID } from "./Config"
import BlazifyClient from "./Lib/Client/BlazifyClient";

const client: BlazifyClient = new BlazifyClient({ token, ownerID })
client.start ()
