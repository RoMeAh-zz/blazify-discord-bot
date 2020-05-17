const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "contact",
    aliases: "bugreport",
    category: "moderation",
    description: "Reports a Bug",
    run: async (client, message, args) => {
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
