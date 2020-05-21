const BlazifyClient = require("../../base/Command")
class Ping extends BlazifyClient {
    constructor(client) {
      super(client, {
        name: "ping",
        description: "Shows the Ping of the bot",
        usage: "b3ping",
        category: "Utility",
        cooldown: 1000,
        aliases: ["pong"],
        permLevel: 1,
        permission: "READ_MESSAGES"
      });
    }
  async run(message, args) {
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!
        Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}
module.exports = Ping;