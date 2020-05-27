const cachedMessageReactions = new Map();
const MessageModel = require("../../Lib/Database/models/message.js");

class messageReactionRemove {
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

    const addTo = await message.guild.members.cache.get(user.id);

    if (addTo._roles.includes(addRole.id)) {
      await addTo.roles.remove(addRole.id);
      console.log("removed");
    } else {
      return;
    };
  };

};
}
module.exports = messageReactionRemove;
