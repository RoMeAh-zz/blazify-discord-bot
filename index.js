const { Client, Collection, Attachment } = require("discord.js");
const Discord = require("discord.js")
const { config } = require("dotenv");
const fs = require("fs");
const ms = require("ms");
let coins = require ("./coins.json");

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
            
})
client.on("message", async message => {
    if (!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        }
    };
let coinAmt = Math.floor(Math.random() * 5)  + 45;
let baseAmt = Math.floor(Math.random() * 5)  + 45;
console.log(`${coinAmt} ; ${baseAmt}`);
if(coinAmt === baseAmt){
    coins[message.author.id] = {
        coins: coins[message.author.id].coins + coinAmt
    };
}
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
    });
  
});




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
      channel.send(`Welcome to the server, ${member}`); 
    });


    client.on('guildmemberRemove', member => { 
        const channel = member.guild.channels.find(channel => channel.id === '691202131872448512');
         if (!channel) return;
          channel.send(`Welcome to the server, ${member}`); 
      
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
        const newLocal = "WHO IS THE BEST?";
        if (msg.content === newLocal) {
            msg.reply('SIR YOU THE ONE AND ONLY ROMEAH')
        }
    })
client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
        case 'help':
            const Embed = new RichEmbed()
                .setThumbnail = (client.user.avatarURL)
                .setTitle = ('Commands of our Official Bot')
                .addField = ('Moderation', "kick, ban, mute, report, unban, unmute")
                .addField = ('Fun', "xpcoins, meme, gglimgn, love, rps")
                .addField = ('Utility', "help, ping, say, whois")
                .setFooter = ("Make sure to use the prefix before these commands. PREFIX IS '_'")
            message.author.send(Embed)
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