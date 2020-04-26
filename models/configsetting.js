const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    guildID: {type: String},
    enableXPCoins: {type: Boolean, default: false},
    enableXP: {type: Boolean, default: false},
    enableCaptcha: {type: Boolean, default: false},
    enableVerification: {type: Boolean, default: false},
    enableAntiSpam: {type: Boolean, default: false},
    enableModeration: {type: Boolean, default: false},
    enableFun: {type: Boolean, default: false},
    enableGiveaway: {type: Boolean, default: false},
    enableEconomy: {type: Boolean, default: false},
    enableMusic: {type: Boolean, default: false},
    enableGaming: {type: Boolean, default: false},
    enableUtility: {type: Boolean, default: false},
    enableWelcome: {type: Boolean, default: false},
});

const settingsModel = mongoose.model('Settings', settingsSchema);
module.exports = settingsModel;
