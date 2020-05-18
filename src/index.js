const Client = require("./base/BlazifyClient.js");
const client = new Client({ config: "./config.json" });
client.login(client.config.token);
client.loadCommands(client.config.paths.commands);
client.loadEvents(client.config.paths.events);
