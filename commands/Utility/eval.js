const { inspect } = require("util")
const Settings = require("../../models/configsetting.js");
module.exports = {
        name: "eval",
        description: "Evaluates code",
        accessableby: "Bot Owner",
        type: "owner",
        usage: `b3eval <input>`,
    run: async (bot, message, args) => {
      let allGuilds = client.guilds.cache.array();
      for (let i = 0; i < allGuilds.length; i++) {
      Settings.findOne(
        { guildID: allGuilds[i].id },
        async (err, settings) => {
          if (err) console.log(err);

          if (!settings) {
            enableUtility = false;
          } else {
            enableUtility = settings.enableUtility
          }
        })
      }
      if(enableUtility === true) {
        if(message.author.id == "560805847517888512, 312149319769784321, 552052137878880256") {
        try {
            let toEval = args.join(" ")
			let evaluated = inspect(eval(toEval, { depth: 0 }));

            if (!toEval) {
                return message.channel.send(`Error while evaluating: \`air\``);
            } else {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
            }

        } catch (e) {
            return message.channel.send(`Error while evaluating: \`${e.message}\``);
        }

      } else {
        return message.reply(" you are not the bot owner!").then(msg => msg.delete(5000))
      }
    }
}
}
