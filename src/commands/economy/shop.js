const { items } = require("../../utils/shop.js");
const Items = require("../../models/items.js");
const Coins = require("../../models/coin");
const BlazifyClient = require("../../base/Command");
const { MessageEmbed } = require("discord.js");

class Buy extends BlazifyClient {

  constructor(client) {
    super(client, {
      name: "shop",
      description: "Displays all available items in the shop",
      usage: "b3shop",
      category: "economy",
      cooldown: 1000,
      aliases: ["bal"],
      permLevel: 1,
      permission: "READ-MESSAGES"
    });
  }
async run(client, message, args) {

    let embed = new MessageEmbed()
    .setTitle("Shop")
    .setColor("RANDOM");

    items.forEach(x => {
        embed.addField(x.itemName.charAt(0).toUpperCase() + x.itemName.slice(1), x.price + " coins")
    });

    message.channel.send(embed);

    }
  };
module.exports = Buy;