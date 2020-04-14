const Discord = module.require("discord.js");

module.exports = {
  name: "anime",
  category: "fun",
  description: "Get a random anime picture",
  run: async (client, message, args) => {
    const animesf = require("snekfetch");

    if (message.channel.nsfw === true) {
    let res = await animesf.get("http://api.cutegirls.moe/json");
    if (res.body.status !== 200) {
      return message.channel.send(
        "An error occurred while processing this command."
      );
    }
    let animepicembed = new Discord.RichEmbed()
      .setColor(`#f00c0c`)
      .setTitle("Anime Picture")
      .setImage(res.body.data.image)
      .setTimestamp()
      //.setFooter(`©Copyright | 2020`)
    message.channel.send(animepicembed);
  }else {
    message.channel.send("Please make this channel to NSFW")}

  }
};