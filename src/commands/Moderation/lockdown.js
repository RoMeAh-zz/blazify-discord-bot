const validateFlag = f => f === 'true' || f === 'false' || f === 'null';
const IGNORED = new Set([
  // PLACE YOUR CHANNEL IDS HERE
]);
const BlazifyClient = require("../../base/Command")
class Lockdown extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "lockdown",
      description: "Locks down all channels to prevent from a raid in the server",
      usage: "b3lock roleID true|false|null",
      category: "Moderation",
      cooldown: 1000,
      aliases: ["banuser"],
      permLevel: 1,
      permission: "BAN_MEMBERS"
    });
  }
async run(client, message, args) {
    if(args.length !== 2)
      return message.channel.send('No Role ID and true or false not provided');
    let [ roleId, flag ] = args;
    if(!isNaN(roleId) && validateFlag(flag.toLowerCase())) {
      if(message.guild.roles.cache.has(roleId)) {
        flag = flag.toLowerCase() === 'true' ? true : (flag.toLowerCase() === 'false' ? false : null);
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        channels.forEach(channel => {
          if(!IGNORED.has(channel.id)) {
            channel.updateOverwrite(roleId, {
              SEND_MESSAGES: !flag
            }).then(g => {
              console.log(`Updated ${g.name} (${g.id})`);
              if(flag) {
                if(!g.name.endsWith('🔒')) {
                  g.edit({ name: g.name + ' 🔒'});
                }
              } else {
                g.edit({ name: g.name.replace(/\s*🔒/, '')});
              }
            })
            .catch(err => console.log(err));
          } else {
            console.log(`Skipping ${channel.name} (${channel.id})`);
          }
        });
      }
      else {
        message.channel.send('Invalid Role.');
      }
    }
}
}
module.exports = Lockdown;
