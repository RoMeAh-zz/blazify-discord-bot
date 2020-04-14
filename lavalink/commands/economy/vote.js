//const Coins = require("../../models/coin.js");
//const { RichEmbed } = require("discord.js");
//const GBL = require("gblapi.js");
//const Cooldowns = new Set();

//module.exports = {
 // name: "daily-claim",
  //description: "Bets some money",
  //usage: "!bet <amt>",
 // category: "economy",
  //accessableby: "Members",
  //aliases: ["dc"],
  //run: async (client, message, args) => {
    
    //const Glenn = new GBL(
      //client.user.id,
      //"XA-ff0e30ea1e1446209ef81343adb48558"
   // );

    //if (
      //Glenn.hasVoted(message.author.id).then(async d => {
        //if (d === false) {
          //let embed = new RichEmbed()
            //.setTitle("You haven't voted!")
            //.setDescription(
              //`[Vote for the bot here](https://glennbotlist.xyz/bot/690934802940952586/vote)`
            //)
            //.setColor("#FF0000");

          //return message.channel.send(embed);
        //} else if (d === true) {
          //if (Cooldowns.has(message.author.id)) {
            //return message.channel.send(
              //"You've already claimed your daily reward from voting!"
            //);
          //} else {
            //let amount = Math.floor(Math.random() * 10000 + 1000);

          //  await Coins.findOne({ userID: message.author.id }, (err, coins) => {
            //  if (err) console.log(err);

            //  coins.coins = +coins.coins + +amount;
             // coins.save().catch(err => console.log(err));
            //});
//
 //           message.channel.send(`Thanks for voting! Here's ${amount} coins.`);

  //          Cooldowns.add(message.author.id);

    //        setTimeout(() => {
      //        Cooldowns.delete(message.author.id);
        //    }, 43200000);
          //}
       // }
  //    })
    //);
//  }
//};
