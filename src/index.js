const Client = require("./base/BlazifyClient.js");
const client = new Client({config: "./config"});
client.login(client.config.token);
client.loadCommands();
client.loadEvents(client.config.paths.events);