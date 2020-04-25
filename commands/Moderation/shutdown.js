
module.exports = {
        name: "restart",
        description: "shuts down the bot!",
        usage: "!shutdown",
        category: "moderation",
        accessableby: "Bot Owner",
        aliases: ["rs"],
    run: async (bot, message, args) => {
      let allGuilds = client.guilds.cache.array();
      for (let i = 0; i < allGuilds.length; i++) {
      Settings.findOne(
        { guildID: allGuilds[i].id },
        async (err, settings) => {
          if (err) console.log(err);

          if (!settings) {
            enableModeration = false;
          } else {
            enableModeration = settings.enableModeration
          }
        })
      }
      if(enableModeration === true) {
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
