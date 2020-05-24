const Coins = require("../../models/coin.js");
const rs = require("randomstring");

const BlazifyClient = require("../../base/Command");
class Work extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "work",
      description: "Generates a Random Word and after typing it, getting coins.",
      usage: "b3work",
      category: "economy",
      cooldown: 1000,
      aliases: ["hardwork"],
      permLevel: 1,
      permission: "READ-MESSAGES"
    });
  }
async run(client, message, args) {

    const ranLength = Math.floor(Math.random() * 15 + 5);
    const ranString = rs.generate(ranLength);
    const amt = Math.floor(Math.random() * 1000 + 500);

    await Coins.findOne({ userID: message.author.id }).then(async (coins) => {
        
        const filter = m => m.author.id === message.author.id;

        message.channel.send(`Type in \`${ranString}\` to work!`);

        message.channel.awaitMessages(filter, { max: 1, time: 15000 }).then(async (res) => {

            if (!res.first()) return message.channel.send("You failed at your job! You earned nothing");

            if (res.first().content != ranString) {
                return message.channel.send("You failed working at your job! You earned nothing!");
            } else {

                message.channel.send(`Good job! You earned ${amt} coins!`);

                coins.coins = coins.coins + amt;
                await coins.save().catch(err => console.log(err));
            };
        });
    });

  }
};
module.exports = Work;