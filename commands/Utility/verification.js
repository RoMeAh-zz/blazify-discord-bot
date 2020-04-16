const { MessageEmbed } = require("discord.js")
const Settings = require("../../models/configsetting.js")
let enableVerification;
module.exports = {
  name: "verify",
  run: async (client, message) => {
    let allGuilds = client.guilds.cache.array();
    for (let i = 0; i < allGuilds.length; i++) {
    await Settings.findOne(
      { guildID: allGuilds[i].id },
      async (err, settings) => {
        if (err) console.log(err);

        if (!settings) {
        enableVerification = false;
        } else {
        enableVerification = settings.enableVerification
        }
      })
      if(enableVerification === true)
    if(message.channel.id === '700401979280719943')
    {
        await message.delete().catch(err => console.log(err));
        const role = message.guild.roles.cache.get('700392946863833249');
        if(role) {
            try {
                await message.member.roles.add(role);
                const Embed = new MessageEmbed()
                .setTitle("VERIFIED")
                .setDescription("You have been verified")
                .setFooter("Only use this if Captcha did not come or Captcha is Disabled")
                message.channel.send(Embed)
                console.log("Role added!");
            }
            catch(err) {
                console.log(err);
            }
        }
    }
  }
}
}
