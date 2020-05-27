const { inspect } = require("util");
const Settings = require("../../../Lib/Database/models/configsetting.js");
const BlazifyClient = require("../../../Lib/Base/Command");
class Eval extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "Evaluates a JavaScript Code.",
      usage: "b3eval message.author.id",
      category: "Bot-Owner-only",
      cooldown: 1000,
      aliases: ["evaluate", "evl"],
      permLevel: 4,
      permission: "BOT_OWNER"
    });
  }
async run(client, message, args) {
    if (
      ["712607705184862278"].includes(message.author.id)
    ) {
      try {
        let toEval = args.join(" ");
        let evaluated = inspect(eval(toEval, { depth: 0 }));

        if (!toEval) {
          return message.channel.send(`Error while evaluating: \`air\``);
        } else {
          let hrStart = process.hrtime();
          let hrDiff;
          hrDiff = process.hrtime(hrStart);
          return message.channel.send(
            `*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ""}${
              hrDiff[1] / 1000000
            }ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``,
            { maxLength: 1900 }
          );
        }
      } catch (e) {
        return message.channel.send(`Error while evaluating: \`${e.message}\``);
      }
    } else {
      return message
        .reply(" you are not the bot owner!")
        .then((msg) => msg.delete(5000));
    }
  }
};
module.exports = Eval;