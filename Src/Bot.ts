import { token, ownerID } from "./Config"
import { BlazifyClient } from "./Lib";

const client: BlazifyClient = new BlazifyClient({ token, ownerID })
client.start().then(r => client.logger.info(r))
