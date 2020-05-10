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
      const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableFun} = guildSettings;
  if(!enableFun) return message.channel.send("Hmm it seems like the Fun commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:3000)");

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

    let dogembed = new MessageEmbed()
    .setColor("#c3ff00")
    .setTitle("Da-Dog")
    .setImage(body.url);

    message.channel.send(dogembed);

}
}
