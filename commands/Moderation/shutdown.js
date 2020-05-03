const Settings = require("../../models/configsetting.js");
module.exports = {
        name: "restart",
        description: "shuts down the bot!",
        usage: "!shutdown",
        category: "moderation",
        accessableby: "Bot Owner",
        aliases: ["rs"],
    run: async (bot, message, args) => {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableModeration} = guildSettings;
if(enableModeration) {
        if(message.author.id != "560805847517888512") return message.channel.send("You are not the bot the owner!")

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
}
