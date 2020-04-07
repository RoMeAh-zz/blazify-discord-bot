module.exports = {
    name: "minecraft",
    description: "Minecraft Server Stats",
    usage: "<user> <platform>",
    category: "miscellaneous",
    accessableby: "Members",
    aliases: ["mc"], 
run: async (bot, message, args) => {
    if(!args[1]) return message.channel.send('You must type a minecraft server ip')
            if(!args[2]) return message.channel.send('You must type a minecraft server port')
 
            ping(args[1], parseInt(args[2]), (error, reponse) =>{
                if(error) throw error
                const Embed = new RichEmbed()
                .setTitle('Server Status')
                .addField('Server IP', reponse.host)
                .addField('Server Version', reponse.version)
                .addField('Online Players', reponse.onlinePlayers)
                .addField('Max Players', reponse.maxPlayers)
               
                message.channel.send(Embed)
            })
        }
    }