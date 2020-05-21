const BlazifyClient = require("../base/Command");
//never remove this BlazifyClient its the one to which the command extends to
class Template extends BlazifyClient {
//replace Template with the command name
  constructor(client) {
//don't change this ^
    super(client, {
//don't change this ^
      name: "template",
//the command name^
      description: "A template for developers on how to add commands",
//description for the help command ^
      usage: "b3template",
//usage for the help command 
      category: "BOT-OWNER-ONLY",
//category names will be given ^
      cooldown: 1000,
//keep cooldown at 1000ms for now, we can discuss on cooldown in future
      aliases: ["tmp"],
//if no aliases just keep it as [""] 
      permLevel: 0,
//for permLevel info check Command.js in base
      permission: "READ_MESSAGES"
//permission needed to execute the command
    });
  }
async run(message, args) {
//async run if u want to asyncronize for using async await 
//code here 
//this is just a template for developers who don't have knowledge in Javascript classes
//remember client is always this.client not just client
//https://discord.gg/BT4aeJJ
//I WROTE THIS AS IM GETTING BANNED FROM DISCORD.
//my account name is ZipZap
message.channel.send("It is just a Template for developers");
}
}
module.exports = Template;
//the class name will be the name for the module.exports
