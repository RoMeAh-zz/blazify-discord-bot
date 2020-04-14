const Discord = require('discord.js');
const mongoose = require("mongoose");


module.exports = {
    name: "xpcoins",
    category: "fun",
    description: "XP",
    run: async (client, message, args) => {
    await message.delete();
      client.mongoose = require("../../utils/mongoose.js");
    const Money = require("../../models/money.js")
Money.findOne({userID : message.author.id, serverID: message.guild.id}, (err, money) => {
    if(err) console.log(err);

    let embed = new Discord.RichEmbed()
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