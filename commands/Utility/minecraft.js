const ping = require('minecraft-server-util');

module.exports = {
    name: "minecraft",
    description: "Minecraft Server Stats",
    usage: "<user> <platform>",
    category: "miscellaneous",
    accessableby: "Members",
    aliases: ["mc"],
run: async (bot, message, args) => {
  let allGuilds = bot.guilds.cache.array();
  for (let i = 0; i < allGuilds.length; i++) {
  Settings.findOne(
    { guildID: allGuilds[i].id },
    async (err, settings) => {
      if (err) console.log(err);

      if (!settings) {
        enableGaming = false;
      } else {
        enableGaming = settings.enableGaming
      }
    })
  }
  if(enableGaming === true) {
    if(!args[1]) return message.channel.send('You must type a minecraft server ip')
            if(!args[2]) return message.channel.send('You must type a minecraft server port')

            ping(args[1], parseInt(args[2]), (error, reponse) =>{
                if(error) throw error
                const Embed = new MessageEmbed()
                .setTitle('Server Status')
                .addField('Server IP', reponse.host)
                .addField('Server Version', reponse.version)
                .addField('Online Players', reponse.onlinePlayers)
                .addField('Max Players', reponse.maxPlayers)

                message.channel.send(Embed)
            })
        }
    }
  }
