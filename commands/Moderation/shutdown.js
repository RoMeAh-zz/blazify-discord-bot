
module.exports = {
        name: "shutdown",
        description: "shuts down the bot!",
        usage: "!shutdown",
        category: "moderation",
        accessableby: "Bot Owner",
        aliases: ["botstop"],
    run: async (bot, message, args) => {

    if(message.author.id != "560805847517888512") return message.channel.send("You are not the bot the owner!")

    try {
        await message.channel.send("Bot is shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }



    }
}
