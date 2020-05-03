const Settings = require("../../models/configsetting.js");
module.exports = {
    name: 'diceroll',
    description: 'Rolls a dice with a given number of sides, default numebr of sides is 6.',
    usage: '[number of sides]',
    run: async (client, message, args) => {
      const guildSettings = await Settings.findOne({guildID: message.guild.id}) || new Settings({
        guildID: message.guild.id
    });
    const {enableFun} = guildSettings;
  if(enableFun) {
        if(!args[0]) {
            args[0] = 6;
          }

          let result = (Math.floor(Math.random() * Math.floor(args[0])));
          message.channel.send(`I rolled ${result + 1}!`);
    }
}
}
