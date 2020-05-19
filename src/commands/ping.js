const BlazifyClient = require("../base/Command");

class Ping extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Pings the bot.",
      usage: "b3ping",
      category: "Information",
      cooldown: 1000,
      aliases: ["pong"],
      permLevel: 0,
      permission: "READ_MESSAGES"
    });
  }
run(message) {
    super.respond(`Pong! Took ${message.createdAt - Date.now()}ms.`);}
}
module.exports = Ping;