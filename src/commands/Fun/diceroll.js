const Settings = require("../../models/configsetting.js");
const BlazifyClient = require("../../base/Command");
class DiceRoll extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "diceroll",
      description: "Generates a Random Number upon the given numbers",
      usage: "b3diceroll 100",
      category: "Fun",
      cooldown: 1000,
      aliases: ["dice"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(message, args) {
      const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableFun} = guildSettings;
  if(!enableFun) return message.channel.send("Hmm it seems like the Fun commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)");
        if(!args[0]) {
            args[0] = 6;
          }

          let result = (Math.floor(Math.random() * Math.floor(args[0])));
          message.channel.send(`I rolled ${result + 1}!`);
    }
}
module.exports = DiceRoll;