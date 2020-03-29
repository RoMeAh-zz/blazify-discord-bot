const { Client, Collection, Attachment, RichEmbed } = require("discord.js");
const Discord = require("discord.js")
const { config } = require("dotenv");
const fs = require("fs");
const ms = require("ms");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://SecondRomeah:itc12345@mongodbxpcoinsystem-cjqmq.mongodb.net/test?retryWrites=true&w=majority/XPCoins", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to the database")
  })
  .catch(err => console.log(err))
const Money = require("./models/money.js")

const client = new Client({
    disableEveryone: true
})
let PREFIX = "_";
const cheerio = require("cheerio");

const request = require("request");

// Collections

client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/.env"
});

// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "Do Not Disturb",
        game: {
            name: "ʙʟᴀᴢᴇ 3 ᴏꜰꜰɪᴄɪᴀʟ ꜱᴇʀᴠᴇʀ GETTING DEVELOPED",
            type: "WATCHING"
        }
    }); 
})
    client.on("message", async message => {
        const prefix = "_";
    
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;
    
        // If message.member is uncached, cache it.
        if (!message.member) message.member = await message.guild.fetchMember(message);
    
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        
        if (cmd.length === 0) return;
        
        // Get the command
        let command = client.commands.get(cmd);
        // If none is found, try to find it by alias
        if (!command) command = client.commands.get(client.aliases.get(cmd));
    
        // If a command is finally found, run the command
        if (command) 
            command.run(client, message, args);
    });
    
client.on("message", message => {
    if (message.author.bot) return;
            let coinstoadd = Math.ceil(Math.random() * 5) + 5;
            console.log(coinstoadd + "coins");
            Money.findOne({userID: message.author.id, serverID: message.guild.id}, (err, money) =>{
                if(err) console.log(err);
                if(!money){
                    const newMoney = new Money({
                        userID: message.author.id,
                        serverID: message.guild.id,
                        money: coinstoadd
                    })
                    newMoney.save().catch(err => console.log(err));
                }else {
                    money.money = money.money + coinstoadd;
                    money.save().catch(err => console.log(err));
                    if(money.money > 999) {
                        let role = message.guild.roles.find(r => r.name === "Freshers");
                        message.member.addRole(role);
                    }
                    if(money.money > 4999) {
                        let role = message.guild.roles.find(r => r.name === "Newbie");
                        message.member.addRole(role);
                    }
                    if(money.money > 9999) {
                        let role = message.guild.roles.find(r => r.name === "Descent Active Chatters");
                        message.member.addRole(role);
                    }
                    if(money.money > 19999) {
                        let role = message.guild.roles.find(r => r.name === "Active Chatters");
                        message.member.addRole(role);
                    }
                    if(money.money > 29999) {
                        let role = message.guild.roles.find(r => r.name === "Very Active Chatters");
                        message.member.addRole(role);
                    }
                    if(money.money > 49999) {
                        let role = message.guild.roles.find(r => r.name === "OP Chatters");
                        message.member.addRole(role);
                    }
                }
            });
        })





client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
 
    switch (args[0]) {
        case 'mute':
            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if(!person) return  message.reply("I CANT FIND THE USER " + person)
 
            let mainrole = message.guild.roles.find(role => role.name === "BLAZE ARMY");
            let role = message.guild.roles.find(role => role.name === "Muted");
           
 
            if(!role) return message.reply("Couldn't find the mute role.")
 
 
            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }
 
            person.removeRole(mainrole.id)
            person.addRole(role.id);
 
 
            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
 
            setTimeout(function(){
                
                person.addRole(mainrole.id)
                person.removeRole(role.id);
                console.log(role.id)
                message.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time));
 
 
    
        break;
    }
 
 
});
client.on('guildMemberAdd', member => { 
    const channel = member.guild.channels.find(channel => channel.id === '691201966105165876');
     if (!channel) return;
     const welcomeEmbed = new RichEmbed()
     .setThumbnail(client.user.avatarURL)
     .setTitle(`Welcome to the Official Blaze 3 Discord Server ${member}`);
     channel.send(welcomeEmbed); 
    });


    client.on('guildmemberRemove', member => { 
        const channel = member.guild.channels.find(channel => channel.id === '691202131872448512');
         if (!channel) return;
          channel.send(`What a bad user he was, he left ou server, ${member}`); 
      
      });
      client.on('message', msg => {
        if (msg.content === "HI MY FIRST BOT") {
            msg.reply('HI SIR,YAHOO I AM THE FIRST BOT MADE BY YOU!')
        }
    })
    
    client.on('message', msg => {
        const newLocal = "What are the current things this bot can do?";
        if (msg.content === newLocal) {
            msg.reply('Sir not much you have done but you have made auto-reply when you or anyone asks a question and you have done the welcome message this is just a bot in which you are learning everything and a server bot is being currently made by !plays')
        }
    })
    
    client.on('message', msg => {
        const newLocal = "_help";
        if (msg.content === newLocal) {
            const hEmbed = new RichEmbed()
            .setThumbnail(client.user.avatarURL)
            .setTitle("Help Command")
            .setColor("#FF0000")
            .addField('Help', "The Help Message has been sent to your DM (Direct Message), if you did not receive the message open up ur DM with the bot as it may be closed or you have disabled Direct Message");
            msg.reply(hEmbed)
        }
    })
client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
        case 'help':
            const helpEmbed = new RichEmbed()
                .setThumbnail(client.user.avatarURL)
                .setTitle('Commands of our Official Bot')
                .addField('Moderation', "kick, ban, mute, report, unban, unmute")
                .addField('Fun', "xpcoins, meme, gglimgn, love, rps, cat, dog")
                .addField('Utility', "help, ping, say, whois")
                .addField('Donate us', "Wanna Donate us, you like our bot, i even don't even have the money to buy a hoster. Donation link coming soon.")
                .setColor("#FF0000")
                .setAuthor('RoMeah made this bot')
                .setFooter("Make sure to use the prefix before these commands. PREFIX IS '_'");
            message.author.send(helpEmbed)
            break;
        }
    })
    client.on('message', message => {

 

        let args = message.content.substring(PREFIX.length).split(" ");
    
     
    
        switch (args[0]) {
    
            case 'gglimgn':
    
            image(message);
    
     
    
            break;
    
        }
    
     
    
    });
    
     
    
    function image(message){
    
     
    
        var options = {
    
            url: "http://results.dogpile.com/serp?qc=images&q=" + "gaming",
    
            method: "GET",
    
            headers: {
    
                "Accept": "text/html",
    
                "User-Agent": "Chrome"
    
            }
    
        };
    
     
    
     
    
     
    
     
    
     
    
        request(options, function(error, response, responseBody) {
    
            if (error) {
    
                return;
    
            }
    
     
    
     
    
            $ = cheerio.load(responseBody);
    
     
    
     
    
            var links = $(".image a.link");
    
     
    
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
    
           
    
            console.log(urls);
    
     
    
            if (!urls.length) {
    
               
    
                return;
    
            }
    
     
    
            // Send result
    
            message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    
        });
    
     
    
     
    
     
    
     
    
     
    
     
    
     
    
     
    
    }
    
  client.login("NjkwOTM0ODAyOTQwOTUyNTg2.XnxO1w.kCqPDMJy39bztyhY8LYrVibalaA")