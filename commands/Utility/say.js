const { RichEmbed } = require("discord.js");
const Settings = require("../../models/configsetting.js");
module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
    description: "Says your input via the bot",
    usage: "<input>",
    run: (client, message, args) => {
      let allGuilds = client.guilds.cache.array();
      for (let i = 0; i < allGuilds.length; i++) {
          let allGuilds = client.guilds.cache.array();
          for (let i = 0; i < allGuilds.length; i++) {
              Settings.findOne(
                  {guildID: allGuilds[i].id},
                  async (err, settings) => {
                      if (err) console.log(err);

                      if (!settings) {
                          enableUtility = false;
                      } else {
                          enableUtility = settings.enableUtility
                      }
                  })
          }
          if (enableUtility === true) {
              message.delete();

              if (!message.member.hasPermission("MANAGE_MESSAGES"))
                  return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

              if (args.length < 0)
                  return message.reply("Nothing to say?").then(m => m.delete(5000));

              const roleColor = message.guild.me.highestRole.hexColor;

              if (args[0].toLowerCase() === "embed") {
                  const embed = new MessageEmbed()
                      .setDescription(args.slice(1).join(" "))
                      .setColor(roleColor === "#000000" ? "#ffffff" : roleColor);

                  message.channel.send(embed);
              } else {
                  message.channel.send(args.join(" "));
              }
          }
      }
}
}
