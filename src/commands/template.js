const BlazifyClient = require("../base/Command");

class Template extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "template",
      description: "A template for developers on how to add commands",
      usage: "b3template",
      category: "BOT-OWNER-ONLY",
      cooldown: 1000,
      aliases: ["tmp"],
      permLevel: 0,
      permission: "READ_MESSAGES"
    });
  }
async run(message, args) {
//code here 
//this is just a template for developers who don't have knowledge in Javascript classes
//remember client is always this.client not just client
message.channel.send("It is just a Template for developers");
}
module.exports = Template;
