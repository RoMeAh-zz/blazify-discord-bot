const ping = require('minecraft-server-util');
const Settings = require("../../models/configsetting.js")
module.exports = {
    name: "minecraft",
    description: "Minecraft Server Stats",
    usage: "<user> <platform>",
    category: "miscellaneous",
    accessableby: "Members",
    aliases: ["mc"],
run: async (bot, message, args) => {
  const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
    guildID: message.guild.id
});
const {enableGaming} = guildSettings;
if(!enableGaming) return message.channel.send("Hmm it seems like the Gaming commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");
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

