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
    if(ucoins > 999) {
        let role = message.guild.roles.find(r => r.id === "role id");
        message.member.addRole(role);
        }
        if(ucoins > 4999) {
            let role = message.guild.roles.find(r => r.id === "role id");
            message.member.addRole(role);
            }
            if(ucoins > 9999) {
                let role = message.guild.roles.find(r => r.id === "role id");
                message.member.addRole(role);
                }
                if(ucoins > 19999) {
                    let role = message.guild.roles.find(r => r.id === "role id");
                    message.member.addRole(role);
                    }
                    if(ucoins > 29999) {
                        let role = message.guild.roles.find(r => r.id === "role id");
                        message.member.addRole(role);
                        }
                        if(coins > 49999) {
                            let role = message.guild.roles.find(r => r.id === "role id");
                            message.member.addRole(role);
                            }
}
}

    
