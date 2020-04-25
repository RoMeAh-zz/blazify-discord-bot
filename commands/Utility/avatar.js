module.exports = {
    name: 'avatar',
    aliases: ['icon', 'logo', 'av'],
    description: 'display the image and url of users\' avatar',
    usage: '[tagged users]',
    run: async (bot, message, args) => {
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
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });

        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    },
};
