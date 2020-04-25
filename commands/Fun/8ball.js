const Discord = require("discord.js");
const bot = new Discord.Client();
module.exports = {
  name: "8ball",
  aliases: [""],
  category: "fun",
  description: "Get a random anime picture",
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
     let reason = args.join(' ');
    if (reason.length < 1) return message.channel.send('You did not give the bot a question');
    var ball = ['It is certain.','No doubt about it.','No chance.','Maybe, time will tell.','No way.','Concentrate and try again.', ' As I see it, yes', 'Outlook good', 'Most likely', 'Better not tell you now', 'My sources say no', 'Signs point to yes', 'Yes definitely', 'It is decidedly so', 'As I see it, yes', 'My sources say no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
    const embed = new Discord.RichEmbed()
    .setColor("f00c0c")
    .addField("You asked", reason)
    .addField("Blazify says", ball[Math.floor(Math.random () * ball.length)])
    .setThumbnail("http://www.pngmart.com/files/3/8-Ball-Pool-Transparent-PNG.png")
    //.setFooter(`©Copyright | 2020`)
    message.channel.send({embed})
}
}
