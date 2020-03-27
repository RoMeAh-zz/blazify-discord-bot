module.exports = {
    name: "help",
    category: "utility",
    description: "Help for bot",
    usage: "<mention, id>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
const embed = new RichEmbed()
.setThumbnail = (client.user.avatarURL)
.setTitle = ('Commands of our Official Bot')
.addField = ('Moderation', "kick, ban, mute, report, unban, unmute")
.addField = ('Fun', "xpcoins, meme, gglimgn, love, rps")
.addField = ('Utility', "help, ping, say, whois")
.setFooter = ("Make sure to use the prefix before these commands. PREFIX IS '_'")
message.author.send(embed)
    }
}