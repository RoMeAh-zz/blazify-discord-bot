const { MessageEmbed } = require("discord.js");
const Coins = require("../../models/coin.js");
const Settings = require("../../models/configsetting.js");

module.exports = {
  name: "leaderboard-coins",
  description: "Display's the economy leaderboard for the guild",
  usage: "!leaderboard",
  category: "economy",
  accessableby: "Members",
  aliases: ["board"],
  run: async (client, message, args) => {
     const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableEconomy} = guildSettings;
if(enableEconomy) {
    let allUsers = message.guild.members
      .filter(m => !m.user.bot)
      .map(m => m.user.id);

    Coins.find({ userID: allUsers })
      .sort([["coins", "descending"]])
      .exec((err, res) => {
        if (err) console.log(err);

        let content = "";

        let embed = new MessageEmbed()
          .setTitle(
            `Leaderboard for ${message.guild.name}`,
            message.guild.iconURL
          )
          .setColor("RANDOM");

        if (res.length === 0) {
          embed.setDescription("No data found");
        } else if (res.length < 10) {
          for (let i = 0; i < res.length; i++) {
            let member =
              message.guild.members.get(res[i].userID) || "User left";

            if (res[i].coins === 0) {
              content += "";
            } else if (member === "User left") {
              content += `${i + 1}. ${member} - ${res[i].coins} coins\n`;
            } else {
              content += `${i + 1}. ${member.user.username} - ${
                res[i].coins
              } coins\n`;
            }

            if (content === "") {
              content += "No data found";
            }

            embed.setDescription(content);
          }
        } else if (res.length >= 10) {
          for (let i = 0; i < 10; i++) {
            let member =
              message.guild.members.get(res[i].userID) || "User Left";
            if (res[i].coins === 0) {
              content += "";
            } else if (member === "User Left") {
              content += `${i + 1}. ${member} - ${res[i].coins} coins\n`;
            } else {
              content += `${i + 1}. ${member.user.username} - ${
                res[i].coins
              } coins\n`;
            }

            if (content === "") {
              content += "No data found";
            }
            embed.setDescription(content);
          }
        }

        message.channel.send(embed);
      });
  }
}
};
