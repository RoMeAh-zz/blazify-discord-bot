const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');
const Settings = require("../../models/configsetting.js");
module.exports = {
        name: "alpaca",
        description: "sends a picture of a alpaca!",
        usage: "",
        category: "images",
        accessableby: "Members",
        aliases: ["catto"],
    run: async (bot, message, args) => {
      let allGuilds = client.guilds.cache.array();
      for (let i = 0; i < allGuilds.length; i++) {
      Settings.findOne(
        { guildID: allGuilds[i].id },
        async (err, settings) => {
          if (err) console.log(err);

          if (!settings) {
            enableFun = false;
          } else {
            enableFun = settings.enableFun
          }
        })
      }
      if(enableFun === true) {
        let msg = await message.channel.send("Generating...")

        fetch("https://apis.duncte123.me/alpaca")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply(" whoops. I broke, try again!")

            let embed = new MessageEmbed()
            .setColor(cyan)
            .setAuthor(`${bot.user.username} Alpaca!`, message.guild.iconURL)
            .setImage(body.data.file)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

                msg.edit(embed)
        })
    }
  }
}
