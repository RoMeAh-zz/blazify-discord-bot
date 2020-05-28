const Client = require ( "./Lib/Base/BlazifyClient.js" );
const client = new Client ({config : "../config" });
client.login (client.config.token);
client.loadCommands();
client.loadEvents();
