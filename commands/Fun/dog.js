const Discord = require("discord.js");
const superagent = require("superagent");


module.exports = {
    name: "dog",
    aliases: ["affinity"],
    category: "fun",
    description: "Calculates the love affinity you have for another person.",
    usage: "[mention | id | username]",
    run: async (client, message, args) => {

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

    let dogembed = new MessageEmbed()
    .setColor("#c3ff00")
    .setTitle("Da-Dog")
    .setImage(body.url);

    message.channel.send(dogembed);

}

}
