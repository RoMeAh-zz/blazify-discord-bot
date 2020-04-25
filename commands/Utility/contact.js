module.exports = {
    name: "contact",
    aliases: "bugreport",
    category: "moderation",
    description: "Reports a Bug",
    run: async (client, message, args) => {
      let allGuilds = client.guilds.cache.array();
      for (let i = 0; i < allGuilds.length; i++) {
      Settings.findOne(
        { guildID: allGuilds[i].id },
        async (err, settings) => {
          if (err) console.log(err);

          if (!settings) {
            enableCaptcha = false;
          } else {
            enableCaptcha = settings.enableCaptcha
          }
        })
      }
  const botClient = require('discord.js'),
        db = require('quick.db')
  if (message.channel.type === "dm") return message.author.send("Go to your server and try to use");
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
        .setTimestamp()
        apa.send(embed)
        message.reply('Successfuly sending, please be patient to approved your message , thanks !')
//message.reply("Thank you for sending a message, please be patient to be accepted! " + p.toString())
    db.add(`usedCommand_${message.author.id}`,1)
}
}
