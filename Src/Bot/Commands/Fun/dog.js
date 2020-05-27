const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");
const Settings = require("../../../Lib/Database/models/configsetting.js");

const BlazifyClient = require("../../../Lib/Base/Command");
class Dog extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "dog",
      description: "Generates a Random Picture of Dog",
      usage: "b3dog",
      category: "Fun",
      cooldown: 1000,
      aliases: ["doggo"],
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

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

    let dogembed = new MessageEmbed()
    .setColor("#c3ff00")
    .setTitle("Da-Dog")
    .setImage(body.url);

    message.channel.send(dogembed);

}
}
module.exports = Dog;