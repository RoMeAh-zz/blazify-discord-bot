const {Discord, MessageEmbed} = require("discord.js");
const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class RandomBall extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "8ball",
      description: "Randomly answers to a question",
      usage: "b38ball Are you a noob?",
      category: "Fun",
      cooldown: 1000,
      aliases: ["question"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(client, message, args) {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
      guildID: message.guild.id
  });
  const {enableFun} = guildSettings;
if(!enableFun) return message.channel.send("Hmm it seems like the Fun commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
     let reason = args.join(' ');
    if (reason.length < 1) return message.channel.send('You did not give the client a question');
    var ball = ['It is certain.','No doubt about it.','No chance.','Maybe, time will tell.','No way.','Concentrate and try again.', ' As I see it, yes', 'Outlook good', 'Most likely', 'Better not tell you now', 'My sources say no', 'Signs point to yes', 'Yes definitely', 'It is decidedly so', 'As I see it, yes', 'My sources say no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
    const embed = new MessageEmbed()
    .setColor("f00c0c")
    .addField("You asked", reason)
    .addField("Blazify says", ball[Math.floor(Math.random () * ball.length)])
    .setThumbnail("http://www.pngmart.com/files/3/8-Ball-Pool-Transparent-PNG.png")
    .setFooter(`©Copyright | 2020`)
    message.channel.send({embed})
}
}
module.exports = RandomBall;