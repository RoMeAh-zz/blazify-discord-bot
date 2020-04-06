const config = require("../config.json")
const Coins = require("../models/coin.js")
const Prefix = require("../models/prefix.js")
const GBL = require("gblapi.js");
const Settings = require("../models/settings.js");
const XP = require("../models/xp.js");

module.exports = async (client) => {
  
  const Glenn = new GBL(client.user.id, 'XA-ff0e30ea1e1446209ef81343adb48558');
  
  setInterval(() => {
    Glenn.updateStats(client.guilds.size);
  }, 900000);
  
  console.log(
    `Hi, ${client.user.username} is now online on ${client.guilds.size} Guilds with ${client.users.size} Members`
  );
  let activities = [
      `b3invite | Invite Me`,
      `b3vote | Help Me grow`,
      `b3role/guild-giveaway-start | Free Required Giveaways`,
      `b3help | ${client.guilds.size} servers!`,
      `b3help | ${client.channels.size} channels!`,
      `b3help | ${client.users.size} users!`,
      `Users Joining the support server`
    
    ],
    i = 0;
  setInterval(
    () =>
      client.user.setPresence({ game: {name: `${activities[i++ % activities.length]}`},
                 type: "WATCHING",
                    status: "IDLE"}),
    12000
  );

  client.channels
    .get("693785937880285204")
    .edit({ name: `${client.guilds.size} Servers` });
  client.channels
    .get("693786407600128120")
    .edit({ name: `${client.users.size} Members` });
  client.channels
    .get("694413926993100830")
    .edit({ name: `${client.channels.size} Channels` });
  
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