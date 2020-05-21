const { MessageEmbed } = require("discord.js")
const Settings = require("../../models/configsetting.js")
let enableVerification;
class Verify extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "verify",
      description: "Verifies a user",
      usage: "b3verify",
      category: "Utility",
      cooldown: 1000,
      aliases: ["berify"],
      permLevel: 1,
      permission: "SEND_MESSAGES"
    });
  }
async run(message, args) {
    const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
      guildID: message.guild.id
  });
  const {enableVerification} = guildSettings;
if(!enableVerification) return message.channel.send("Hmm it seems like the Verification commands are not enabled if you want to enable them please go to the dashboard. Click [here](http://localhost:8080)")
    if(message.channel.id === '709355117639499777')
    {
        await message.delete().catch(err => console.log(err));
        const role = message.guild.roles.cache.get('709359183794798612');
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
    } else {
      message.channel.send("This is not a verification Channel")
    }
  }
  }
module.exports = Verify;