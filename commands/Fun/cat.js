const Discord = require("discord.js");
const superagent = require("superagent");


module.exports = {
    name: "cat",
    aliases: ["affinity"],
    category: "fun",
    description: "Calculates the love affinity you have for another person.",
    usage: "[mention | id | username]",
    run: async (client, message, args) => {

  let {body} = await superagent
  .get(`https://www.bing.com/images/search?q=cat&FORM=HDRSC2`);

    let catembed = new Discord.RichEmbed()
    .setColor("#c3ff00")
    .setTitle("Me-Meow")
    .setImage(body.url);

    message.channel.send(catembed);

}

}