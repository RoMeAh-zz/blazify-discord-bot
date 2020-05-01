const Discord = require("discord.js");
const superagent = require("superagent");
const Settings = require("../../models/configsetting.js");

module.exports = {
    name: "dog",
    aliases: ["affinity"],
    category: "fun",
    description: "Calculates the love affinity you have for another person.",
    usage: "[mention | id | username]",
    run: async (client, message, args) => {
      let allGuilds = client.guilds.cache.array();
      for (let i = 0; i < allGuilds.length; i++) {
      Settings.findOne(
        { guildID: allGuilds[i].id },
        async (err, settings) => {
          if (err) console.log(err);

          if (!settings) {
            enableFun = false;
          } else {
            enableFun = settings.enableFun
          }
        })
      }
      if(enableFun === true) {

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

    let dogembed = new MessageEmbed()
    .setColor("#c3ff00")
    .setTitle("Da-Dog")
    .setImage(body.url);

    message.channel.send(dogembed);

}
}
}
