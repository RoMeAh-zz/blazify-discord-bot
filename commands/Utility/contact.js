module.exports = {
    name: "contact",
    aliases: "bugreport",
    category: "moderation",
    description: "Reports a Bug",
    run: async (client, message, args) => {
  const apa = client.channels.cache.get("698992662300065912")
        const p = client.emojis.find(a => a.name === 'accepted')

        const g = args.join(" ")
        if (!g) return message.reply(`Please put the message/bug`)
        const embed = new botClient.MessageEmbed()
        .setTitle('Bug reports from people!')
        .setColor('#ff0000')
        .setThumbnail(message.author.displayAvatarURL)
        .addField('Time : ', new Date())
        .addField('From : ', message.author.tag + ` (${message.author.id})`)
        .addField('Message :', g)
    .addField("In Guild :", message.guild.name + ` (${message.guild.id})`)
        apa.send(embed)
message.reply("Thank you for sending a message, please be patient to be accepted! " + p.toString())

}
}
