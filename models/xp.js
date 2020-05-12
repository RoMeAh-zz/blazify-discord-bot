const mongoose = require("mongoose");

const xpSchema = mongoose.Schema({
  userID: {type: String},
  guildID: {type: String},
  userName:{type: String},
  xp: {type: Number},
  level: {type: Number},
})

module.exports = mongoose.model('XP', xpSchema);
