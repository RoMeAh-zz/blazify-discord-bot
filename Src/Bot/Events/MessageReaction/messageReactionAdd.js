const MessageModel = require('../../../Lib/Database/models/message.js');
const discord = require("discord.js")
const client = new discord.Client({ partials: ['MESSAGE', 'REACTION']});
class messageReactionAdd {
    constructor(client) {
      this.client = client;
    }
    
   async run(messageReaction, user) {

       const message = messageReaction.message;

       const roleDocument = await MessageModel.findOne({ messageId: message.id });

       if (!roleDocument) return;

       const emojiID = messageReaction._emoji.id;

       if (roleDocument.emojiRoleMappings.hasOwnProperty(emojiID)) {
        const roleID = roleDocument.emojiRoleMappings[emojiID];
        const addRole = await message.guild.roles.cache.find(x => x.id === roleID);

        if (!addRole) return;

        const addto = await message.guild.members.cache.get(user.id);
        
        if (addto._roles.includes(addRole.id)) {
            return;
        } else {
            await addto.roles.add(addRole.id);
            console.log("added");
        };
       };

}
}
module.exports = messageReactionAdd;