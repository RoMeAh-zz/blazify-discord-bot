const { MessageEmbed } = require("discord.js");
const Coins = require("../../../Lib/Database/models/coin.js");
const Settings = require("../../../Lib/Database/models/configsetting.js");

const BlazifyClient = require("../../../Lib/Base/Command");
class Leaderboard extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "leaderboard-coins",
      description: "Shows the leaderboard of Economy Coins",
      usage: "b3leaderboard-coins",
      category: "economy",
      cooldown: 1000,
      aliases: ["top-c", "lb-c"],
      permLevel: 1,
      permission: "READ-MESSAGES"
    });
  }
async run(client, message, args) {
     const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableEconomy} = guildSettings;
if(!enableEconomy) return message.channel.send("Hmm it seems like the Economy commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)");
    let allUsers = message.guild.members.cache
      .filter(m => !m.user.bot)
      .map(m => m.user.id);

    await Coins.find({ userID: allUsers })
      .sort([["coins", "descending"]])
      .exec(async (err, res) => {
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
              message.guild.members.cache.get(res[i].userID) || "User left";

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
              message.guild.members.cache.get(res[i].userID) || "User Left";
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
};
module.exports = Leaderboard;