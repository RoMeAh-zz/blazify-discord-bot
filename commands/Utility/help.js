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
        "<a:miscy:690197767057834060> Music",
        "`play, pause, queue, skip, volume, nowplaying, leave`",
        true
      )
      .addField(
        "<a:bannedx:695011172591599728> Moderation",
        "`kick, ban, warn, mute, createchannel, report, unban, unmute, softban, forceban, addrole, removerole, config, config prefix`",
        true
      )
      .addField(
        "<a:snowboy:675400549235032085> Level System",
        "`profile, xp, xpcoins, settings config true, config enablexpcoins true`",
        true
      )
      .addField(
        "<a:funsx:695011583864078376> Fun",
        "`love, rps, 8ball, ascii, diceroll`",
        true
      )
      .addField(
        "<a:imagex:675626667796070407> Image Commands",
        "`meme, llama, alpaca, seal, cat, dog, gglimgn, anime, pepe, triggered`",
        true
      )
      .addField(
        "<a:moneyx:675403000092688433> Economy",
        "`balance, bet, leaderboard-coins, rob, add-money, remove-money, remove-money half, remove-money-all`",
        true
      )
      .addField(
        "<a:grxz:695226497115619408> Giveaway",
        " `guild-giveaway-start, role-giveaway-start, giveaway-start, giveaway-reroll, giveaway-delete, giveaway-edit`",
        true
      )
      .addField(
        "<a:gamesx:695011807743574046> Gaming",
        " `apex, fortnite, overwatch, rainbow6`",
        true
      )
      .addField(
        "<a:utilityx:695012067693953066> Utility",
        " `help, ping, say, whois, serverinfo, instagram, uptime`",
        true
      )
      .setColor("#FF0000")
      .setAuthor("Blaze 3 Bot - The Ultimate All in One (v5)")
      .addField(
        "<a:boix:695012479889047662> Bot Owner Only ",
        "`eval, reload, shutdown`",
        true
      )
      .addField(
        "<a:nitroboost:690090581506261003> Others",
        `[Support Server](https://discord.gg/3JrdUxt) |  [Invite to your server](https://discordapp.com/oauth2/authorize?client_id=690934802940952586&scope=bot&permissions=2146958847) |  [Vote the Bot](https://glennbotlist.xyz/bot/690934802940952586/vote) | [Donate](https://www.paypal.me/roahgaming)`,
        false
      )
      .setFooter(
        `Make sure to use the prefix before these commands. PREFIX IS '${prefix}'. If you find any bug, feel free to report them using b3contact <bug>`
      );
    message.channel.send(helpEmbed);
  }
};
