const { MessageEmbed } = require("discord.js")

class Bug extends BlazifyClient {
    constructor(client) {
      super(client, {
        name: "contact",
        description: "Contact the developers for bugs....",
        usage: "b3contact afk command is not working",
        category: "Utility",
        cooldown: 1000,
        aliases: ["bug-report", "bug"],
        permLevel: 1,
        permission: "READ_MESSAGES"
      });
    }
  async run(message, args) {
  const apa = client.channels.cache.get("705693646623604788")

        const g = args.join(" ")
        if (!g) return message.reply(`Please put the message/bug`)
        const embed = new MessageEmbed()
        .setTitle('Bug reports from people!')
        .setColor('#ff0000')
        .setThumbnail(message.author.displayAvatarURL)
        .addField('Time : ', new Date())
        .addField('From : ', message.author.tag + ` (${message.author.id})`)
        .addField('Message :', g)
    .addField("In Guild :", message.guild.name + ` (${message.guild.id})`)
        apa.send(embed)
message.reply("Thank you for sending a message, please be patient to be accepted!")

}
}
module.exports = Bug;