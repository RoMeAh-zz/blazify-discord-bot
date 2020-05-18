const Blacklist = require("../../models/blacklist.js");
module.exports = {
        name: "blacklist",
        description: "reloads a bot command!",
        usage: "!reload",
        category: "moderation",
        accessableby: "Bot Owner",
        aliases: ["creload"],
    run: async (client, message, args) => {
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
