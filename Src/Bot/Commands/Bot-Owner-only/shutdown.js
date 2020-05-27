const Settings = require("../../../Lib/Database/models/configsetting.js");
const BlazifyClient = require("../../../Lib/Base/Command");
class Shutdown extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "restart",
      description: "Restarts the Bot",
      usage: "b3restart",
      category: "Bot-Owner-only",
      cooldown: 1000,
      aliases: ["rs"],
      permLevel: 4,
      permission: "SERVER_OWNER"
    });
  }
async run(client, message, args) {
        if(message.author.id != "712607705184862278") return message.channel.send("You are not the bot the owner!")

    try {
       await message.channel.send("Bot is restarting...").then(m => {
      let choices = ["Wumpus, is it a success?", "Ah Shit here we go again, is it done?"]
      let response = choices[Math.floor(Math.random() * choices.length)]
       m.edit(`${response}: Yes, Success`)

        process.exit()
       })
       } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)

       }


}
    }
module.exports = Shutdown;