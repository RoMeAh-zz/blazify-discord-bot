const { RichEmbed } = require("discord.js");
let Prefix = require("../../models/prefix.js");
let prefix;

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "Utility",
  description: "Shows all bot commands",
  run: async (client, message, args) => {
    await Prefix.findOne({ guildID: message.guild.id }, (err, prefixes) => {
      if (err) console.log(err);

      prefix = prefixes.prefix;
    });

    const helpEmbed = new RichEmbed()
      .setImage(
        `https://cdn.discordapp.com/attachments/632098744262721564/633640689955110912/nitro.gif`
      )
      .setThumbnail(client.user.avatarURL)
      .setTitle("Commands of our Official Bot")
      .addField(
        "Music",
        "`play, pause, queue, skip, volume, nowplaying, leave`",
        true
      )
      .addField(
        "Moderation",
        "`kick, ban, warn, mute, createchannel, report, unban, unmute, softban, forceban, addrole, removerole, config, config prefix, config enableinvtracker true, config enablecaptcha true`",
        true
      )
      .addField(
        "Level System",
        "`profile, xp, xpcoins,config enablexp true, config enablexpcoins true`",
        true
      )
      .addField(
        "Fun",
        "`love, rps, 8ball, ascii, diceroll`",
        true
      )
      .addField(
        "Image Commands",
        "`meme, llama, alpaca, seal, cat, dog, gglimgn, anime, pepe, triggered`",
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
      .setAuthor("Blaze 3 Bot - The Ultimate All in One (v5)")
      .addField(
        "Bot Owner Only ",
        "`eval, reload, shutdown`",
        true
      )
      .addField(
        "Others",
        `[Support Server](https://discord.gg/3JrdUxt) |  [Invite to your server](https://discordapp.com/oauth2/authorize?client_id=690934802940952586&scope=bot&permissions=2146958847) |  [Vote the Bot](https://glennbotlist.xyz/bot/690934802940952586/vote) | [Donate](https://www.paypal.me/roahgaming)`,
        false
      )
      .setFooter(
        `Make sure to use the prefix before these commands. PREFIX IS '${prefix}'. If you find any bug, feel free to report them using b3contact <bug>`
      );
    message.channel.send(helpEmbed);
  }
};
