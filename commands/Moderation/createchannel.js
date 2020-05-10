const Settings = require("../../models/configsetting.js");
module.exports = {
    name: "createchannel",
    category: "moderation",
    description: "Kicks the member",
    usage: "<id | mention>",
    run: async (client, message, args) => {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableModeration} = guildSettings;
if(!enableModeration) return message.channel.send("Hmm it seems like the moderation commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)")
  try {
    if (!args[1]) return message.reply('You need to input the channel type!');
    if (!args[0]) return message.reply('You need to input the channel name!');

    message.channel.send('I\'ve created the channel!').then(() => {
      message.guild.createChannel(args[1], args[0], []).catch((err) => {
        message.channel.send('There was an error!')
      })
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
    }
}
