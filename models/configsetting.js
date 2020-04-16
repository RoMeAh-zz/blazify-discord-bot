const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  guildID: {type: String},
  enableXPCoins: { type: Boolean, default: false},
  enableXP: { type: Boolean, default: false},
  enableCaptcha: {type: Boolean, default: false},
  enableVerification: { type: Boolean, default: false },
  enableAntiSpam: { type: Boolean, default: false },
});

module.exports = mongoose.model('Settings', settingsSchema);
