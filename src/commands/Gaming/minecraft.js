const ping = require('minecraft-server-util');
const Settings = require("../../models/configsetting.js")
const BlazifyClient = require("../../base/Command");
class Minecraft extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "minecraft",
      description: "Shows the info of a minecraft Server",
      usage: "b3mc serverIP port",
      category: "Gaming",
      cooldown: 1000,
      aliases: ["mc"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(client, message, args) {
  const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
    guildID: message.guild.id
});
const {enableGaming} = guildSettings;
if(!enableGaming) return message.channel.send("Hmm it seems like the Gaming commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
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
module.exports = Minecraft;