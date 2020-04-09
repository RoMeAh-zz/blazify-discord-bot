const config = require("../config.json")
const Coins = require("../models/coin.js")
const Prefix = require("../models/prefix.js")
//const GBL = require("gblapi.js");
const Settings = require("../models/settings.js");
const XP = require("../models/xp.js");
const { ErelaClient, Utils } = require("erela.js");
const { nodes } = require("../botconfig.json")
module.exports = async (client) => {
  
 // const Glenn = new GBL(client.user.id, 'XA-ff0e30ea1e1446209ef81343adb48558');
  
//  setInterval(() => {
  //  Glenn.updateStats(client.guilds.size);
 // }, 900000);
  
  console.log(
    `Hi, ${client.user.username} is now online on ${client.guilds.size} Guilds with ${client.users.size} Members`
  );

  client.music = new ErelaClient(client, nodes)
  .on("nodeError", console.log)
  .on("nodeConnect", () => console.log("Successfully created a new Node."))
  .on("queueEnd", player => {
      player.textChannel.send("Queue has ended.")
      return client.music.players.destroy(player.guild.id)
  })
  .on("trackStart", ({textChannel}, {title, duration}) => textChannel.send(`Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``).then(m => m.delete(15000)));

client.levels = new Map()
  .set("none", 0.0)
  .set("low", 0.10)
  .set("medium", 0.15)
  .set("high", 0.25);

let activities = [ `${client.guilds.size} servers!`, `${client.channels.size} channels!`, `${client.users.size} users!` ], i = 0;
setInterval(() => client.user.setActivity(`${Prefix}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000)


  client.channels
    .get("693785937880285204")
    .edit({ name: `${client.guilds.size} Servers` });
  client.channels
    .get("693786407600128120")
    .edit({ name: `${client.users.size} Members` });
  client.channels
    .get("694413926993100830")
    .edit({ name: `${client.channels.size} Channels` });
  
    // Requires Manager from discord-giveaways
const { GiveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

let allGiveaways = client.giveawaysManager.giveaways; // [ {Giveaway}, {Giveaway} ]

    // The list of all the giveaways on the server with ID "1909282092"
    let onServer = client.giveawaysManager.giveaways.filter((g) => g.guildID === "1909282092");

    // The list of the current giveaways (not ended)
    let notEnded = client.giveawaysManager.giveaways.filter((g) => !g.ended);

  let allUsers = client.users.array();
  
      for (let i = 0; i < allUsers.length; i ++) {
        
        await Coins.findOne({ userID: allUsers[i].id }, async (err, user) => {
          
          if (err) console.log(err);
          
          if (!user) {
            const newCoins = new Coins({
                userName: allUsers[i].username,
                userID: allUsers[i].id,
                coins: 0
            })
            
            await newCoins.save().catch(err => console.log(err));
            console.log(`The user: '${allUsers[i].username}' has been added to the mongoDB coins database`);
          }
        })
      }
  
        for (let i = 0; i < allUsers.length; i ++) {
        
        await XP.findOne({ userID: allUsers[i].id }, async (err, user) => {
          
          if (err) console.log(err);
          
          if (!user) {
            const newXP = new XP({
                userID: allUsers[i].id,
                userName: allUsers[i].username,
                xp: 0,
                level: 1,
            });
            
            await newXP.save().catch(err => console.log(err));
            console.log(`The user: '${allUsers[i].username}' has been added to the XP database`);
          }
        })
      }

 await client.guilds.keyArray().forEach(id => {

         Prefix.findOne({
             guildID: id
         }, (err, guild) => {
             if (err) console.error(err);

             if (!guild) {
                 const newPrefix = new Prefix({
                     guildID: id,
                     prefix: config.prefix
                 });

                 return newPrefix.save();
 }
                   });

     });
  
  let allGuilds = client.guilds.array();
  
  for (let i = 0; i < allGuilds.length; i++) {
    
    await Prefix.findOne({ guildID: allGuilds[i].id }, (err, prefix) => {
      
      if (err) console.log(err);
      
      if (!prefix) {
        const newPrefix = new Prefix({
          guildID: allGuilds[i].id,
          prefix: "b3"
        });
        newPrefix.save().catch(err => console.log(err));
        console.log(`The guild: '${allGuilds[i].name}' has been added to the prefix database`);
      };
    });
  };
  
  
  for (let i = 0; i < allGuilds.length; i++) {
    
    await Settings.findOne({ guildID: allGuilds[i].id }, async (err, guild) => {
      
      if (err) console.log(err);
      
      if (!guild) {
        const newGuild = new Settings({
          guildID: allGuilds[i].id,
          enableXPCoins: false,
          enableXP: false,
        });
        await newGuild.save().catch(err => console.log(err));
        console.log(`Added the guild: ${allGuilds[i].name} to the database`)
      };
    });
  };
};
