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
  const Money = require("../../models/money.js");

module.exports = {
    name: "leaderboard",
    category: "fun",
    description: "XP",
    run: async (client, message, args) => {
    await message.delete();
    Coins.find({serverID: message.guild.id}).sort([['coins', 'descending']]).exec((err, res) => { 
        if(err) console.log(err);

        let embed = new Discord.RichEmbed()
        .setTitle("XPCoins Leaderboard")
        if (res.length === 0) {
            embed.setColor("#FF0000")
            embed.addField("No Data Found", "Please type in the chat to gain XPCoins!")
        }else if (res.length < 10) {
            embed.setColor("#FF0000")
            for(i= 0; i < res.length; i++) {
                let member = message.guild.members.get(res[i].userID) || "User Left the Server"
                if(member === "User Left") {
                    embed.addField(`${i + 1}. ${member}`, `**Money**: ${res[i].money}`);
                
        }else {
            embed.addField(`${i + 1}. ${member.user.username}`, `**Money**: ${res[i].money}`);
        }
    }
    }else {

        embed.setColor("#FF0000")
        for(i= 0; i < 10; i++) {
            let member = message.guild.members.get(res[i].userID) || "User Left the Server"
            if(member === "User Left") {
                embed.addField(`${i + 1}. ${member}`, `**Money**: ${res[i].money}`);
            
    }else {
        embed.addField(`${i + 1}. ${member.user.username}`, `**Money**: ${res[i].money}`);
    }
    }
}

message.channel.send(embed);
    })
}
}