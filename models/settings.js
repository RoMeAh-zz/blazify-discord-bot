const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  guildID: String,
  enableXPCoins: { type: Boolean, default: false},
  enableXP: { type: Boolean, default: false},
});

module.exports = mongoose.model('Settings', settingsSchema);