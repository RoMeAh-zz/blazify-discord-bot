module.exports = {
    name: "afk",
    aliases: ["away"],
    category: "moderation",
    description: "Sets the AFK Status of a user",
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

      let reason = args.join(" ") ? args.join(" ") : "AFKING";
      let afks = client.afk.get(message.author.id);

      if (!afks) {
        let data = {
          id: message.author.id,
          reason: reason
        };

        client.afk.set(message.author.id, data);
        return message.channel.send(`You are now afk. Reason: ${reason}`)
      };
    }
}
