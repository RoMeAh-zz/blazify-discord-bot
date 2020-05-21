const Settings = require("../../models/configsetting.js");

const BlazifyClient = require("../../base/Command");
class GGLIMGN extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "gglimgn",
      description: "Generates a Random Picture from Google",
      usage: "b3gglimgn",
      category: "Fun",
      cooldown: 1000,
      aliases: ["img"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(message, args) {
    const guildSettings =
      (await Settings.findOne({ guildID: message.guild.id })) ||
      new Settings({
        guildID: message.guild.id,
      });
    const { enableFun } = guildSettings;
    if (!enableFun)
      return message.channel.send(
        "Hmm it seems like the Fun commands are not enabled if you want to enable them please go to the dashboard. Click [here](https://blazify-dashboard.glitch.me)"
      );
    image(message);
    function image(message) {
      var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "gaming",

        method: "GET",

        headers: {
          Accept: "text/html",

          "User-Agent": "Chrome",
        },
      };

      request(options, function (error, response, responseBody) {
        if (error) {
          return;
        }

        $ = cheerio.load(responseBody);

        var links = $(".image a.link");

        var urls = new Array(links.length)
          .fill(0)
          .map((v, i) => links.eq(i).attr("href"));

        console.log(urls);

        if (!urls.length) {
          return;
        }

        // Send result

        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
      });
    }
  }
};
module.exports = GGLIMGN;