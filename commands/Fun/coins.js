const Discord = require("discord.js");
let coins = require ("../../coins.json");

module.exports = {
    name: "xpcoins",
    category: "fun",
    description: "XP coins",
    usage: "<mention, id>",
run: async (client, message, args) => {
if(!coins[message.author.id]){
    coins[message.author.id] = {
        coins: 0
    };
}


let uCoins = coins[message.author.id].coins;

let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#FF0000")
    .addField("XP Coins", uCoins);
    message.channel.send(coinEmbed)
    if(coins > 999) {
        let role = message.guild.roles.find(r => r.name === "Freshers");
        message.member.addRole(role);
        }
        if(uCoins > 4999) {
            let role = message.guild.roles.find(r => r.name ="Newbie");
            message.member.addRole(role);
            }
            if(uCoins > 9999) {
                let role = message.guild.roles.find(r => r.name === "Active Chatters");
                message.member.addRole(role);
                }
                if(uCoins > 19999) {
                    let role = message.guild.roles.find(r => r.name === "Descent Active Chatters");
                    message.member.addRole(role);
                    }
                    if(uCoins > 29999) {
                        let role = message.guild.roles.find(r => r.name === "Very Active Chatters");
                        message.member.addRole(role);
                        }
                        if(uCoins > 49999) {
                            let role = message.guild.roles.find(r => r.name === "OP Chatters");
                            message.member.addRole(role);
                            }
}
}

    
