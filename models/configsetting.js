const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    guildID: {type: String},
    enableXPCoins: {type: Boolean, default: true},
    enableXP: {type: Boolean, default: true},
    enableCaptcha: {type: Boolean, default: true},
    enableVerification: {type: Boolean, default: true},
    enableAntiSpam: {type: Boolean, default: true},
    enableModeration: {type: Boolean, default: true},
    enableFun: {type: Boolean, default: true},
    enableGiveaway: {type: Boolean, default: true},
    enableEconomy: {type: Boolean, default: true},
    enableMusic: {type: Boolean, default: true},
    enableGaming: {type: Boolean, default: true},
    enableUtility: {type: Boolean, default: true},
    enableWelcome: {type: Boolean, default: true},
});

const settingsModel = mongoose.model('Settings', settingsSchema);
module.exports = settingsModel;
