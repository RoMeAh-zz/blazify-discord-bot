module.exports = {
    name: "createchannel",
    category: "moderation",
    description: "Kicks the member",
    usage: "<id | mention>",
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
