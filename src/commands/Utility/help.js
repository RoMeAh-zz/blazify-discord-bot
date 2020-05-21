const { MessageEmbed } = require("discord.js");
let Prefix = require("../../models/prefix.js");
let prefix;
const BlazifyClient = require("../../base/Command")
class Help extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Shows all the commands and how to use them",
      usage: "b3avatar @moo",
      category: "Utility",
      cooldown: 1000,
      aliases: ["h"],
      permLevel: 1,
      permission: "READ_MESSAGES"
    });
  }
async run(message, args) {
    await Prefix.findOne({ guildID: message.guild.id }, (err, prefixes) => {
      if (err) console.log(err);

      prefix = prefixes.prefix;

    });

    const helpEmbed = new MessageEmbed()
      .setThumbnail(client.user.avatarURL)
      .setTitle("Commands of our Official Bot")
      .addField(
        "Music",
        "`play, pause, queue, skip, volume, nowplaying, leave`",
        true
      )
      .addField(
        "Moderation",
        "`kick, ban, warn, mute, createchannel, report, unban, unmute, softban, addrole, removerole, config, config prefix, config enablecaptcha true`",
        true
      )
      .addField(
        "Level System",
        "`profile ,config enablexp true, config enablexpcoins true`",
        true
      )
      .addField(
        "Fun",
        "`love, rps, 8ball, ascii, diceroll`",
        true
      )
      .addField(
        "Image Commands",
        "`meme, llama, alpaca, seal, cat, dog, pepe`",
        true
      )
      .addField(
        "Economy",
        "`balance, bet, leaderboard-coins, rob, add-money, remove-money, remove-money half, remove-money-all`",
        true
      )
      .addField(
        "Giveaway",
        " `guild-giveaway-start, role-giveaway-start, giveaway-start, giveaway-reroll, giveaway-delete, giveaway-edit`",
        true
      )
      .addField(
        "Gaming",
        " `apex, fortnite, overwatch, rainbow6`",
        true
      )
      .addField(
        "Utility",
        " `help, ping, say, whois, serverinfo, instagram, uptime`",
        true
      )
      .setColor("#FF0000")
      .setAuthor("Blaze 3 Bot - The Ultimate All in One (Vesion 7)")
      .addField(
        "Bot Owner Only ",
        "`eval, blacklist, reload, shutdown`",
        true
      )
      .addField(
        "Others",
        `[Support Server](https://discord.gg/YtJ6pYu) |  [Invite to your server](https://discordapp.com/oauth2/authorize?client_id=696756322825404416&scope=bot&permissions=2146958847) |  [Vote the Bot](https://glennbotlist.xyz/bot/690934802940952586/vote) | [Donate](https://www.paypal.me/roahgaming)`,
        false
      )
      .setFooter(
        `Make sure to use the prefix before these commands. PREFIX IS '${prefix}'. If you find any bug, feel free to report them using ${prefix}contact <bug>`
      );
    message.channel.send(helpEmbed);
  }
};
module.exports = Help;