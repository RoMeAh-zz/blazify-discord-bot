const Blacklist = require("../../models/blacklist.js");
const BlazifyClient = require("../../base/Command");
class Blacklist1 extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "blacklist",
      description: "Blacklists a user or server in the bot.",
      usage: "b3blacklist [serverID/userID] [true/false]",
      category: "BOT-OWNER-ONLY",
      cooldown: 1000,
      aliases: ["bc", "blck"],
      permLevel: 4,
      permission: "BOT_OWNER"
    });
  }
async run(client, message, args) {
    if(message.author.id != "560805847517888512")
  return message.channel.send("You are not the bot the owner!")
let blacklistid = args[0]
if(!args[0])return message.channel.send("No user ID was given for the blacklist command")
let boolean = args[1]
if(!args[1])return message.channel.send("Heyo either tell true else false")
Blacklist.findOne(
  { userID: blacklistid },
  (err, blacklist) => {
    if (err) console.log(err);
    if (!blacklist) {
      const newBlacklist = new Blacklist({
        userID: blacklistid,
        blacklisted: boolean,
      });
      newBlacklist.save().catch(err => console.log(err));
message.channel.send("<@"+ blacklistid +"> has been blacklisted (" + boolean + ")")
  } else {
     blacklist.blacklist = boolean
     blacklist.save().catch(err => console.log(err));
message.channel.send("<@"+ blacklistid +"> has been blacklisted (" + boolean + ")")
}
  })
}
}
module.exports = Blacklist1;