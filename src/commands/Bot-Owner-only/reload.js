const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class Reload extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "reload",
      description: "Reloads a Command of bot",
      usage: "b3reload play",
      category: "BOT-OWNER-ONLY",
      cooldown: 1000,
      aliases: ["rld"],
      permLevel: 4,
      permission: "BOT_OWNER"
    });
  }
async run(client, message, args) {
    if(message.author.id != "560805847517888512")
  return message.channel.send("You are not the bot the owner!")

    if(!args[0]) return message.channel.send("Please provide a command to reload!")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`)
}
    }
module.exports = Reload;