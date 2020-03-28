const Discord = require('discord.js');
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://SecondRomeah:itc12345@mongodbxpcoinsystem-cjqmq.mongodb.net/test?retryWrites=true&w=majority/XPCoins", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to the database")
  })
  .catch(err => console.log(err))

module.exports = {
    name: "xpcoins",
    category: "fun",
    description: "XP",
    run: async (client, message, args) => {
    await message.delete();
    const Money = require("../../models/money.js")
    if (message.author.id !=="560805847517888512") return;
Money.findOne({userID : message.author.id, serverID: message.guild.id}, (err, money) => {
    if(err) console.log(err);

    let embed = new Discord.RichEmbed()
    .setTitle("XP COINS")
    .setColor("#4000FF")
    .setThumbnail(message.author.displayAvatarURL);
    if(!money) {
      embed.addField("Coins", "0", true);
      return message.channel.send(embed);
    }else {
      embed.addField("Coins", money.money, true)
      return message.channel.send(embed);
}
     
})

}
}