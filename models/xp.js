const mongoose = require("mongoose");

const xpSchema = mongoose.Schema({
  userID: {type: String},
  guildID: {type: String},
  userName:{type: String},
  xp: Number,
  level: Number,
})

module.exports = mongoose.model('XP', xpSchema);