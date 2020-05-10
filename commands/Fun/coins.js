const { MessageEmbed } = require('discord.js');
const mongoose = require("mongoose");
const Settings = require("../../models/configsetting.js");

module.exports = {
    name: "xpcoins",
    category: "fun",
    description: "XP",
    run: async (client, message, args) => {
      const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableXPCoins} = guildSettings;
  if(!enableXPCoins) return message.channel.send("Hmm it seems like the XP Coin commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
    await message.delete();
      client.mongoose = require("../../utils/mongoose.js");
    const Money = require("../../models/money.js")
Money.findOne({userID : message.author.id, serverID: message.guild.id}, (err, money) => {
    if(err) console.log(err);

    let embed = new MessageEmbed()
    .setTitle("💸💰XP COINS💰💸")
    .setColor("#4000FF")
    .addField("USER", message.author.username)
    .setThumbnail(message.author.displayAvatarURL);
    if(!money) {
      embed.addField("💲Coins💲", "0", true);
      return message.channel.send(embed);
    }else {
      embed.addField("💲Coins💲", money.money, true)
      return message.channel.send(embed);
}

})
}
}
