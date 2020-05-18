const mongoose = require('mongoose');

const perguildlogandwelcomeSchema = new mongoose.Schema({
    guildID: {type: String},
    logChannel: {type: String},
    reportChannel: {type: String},
    welcomeChannel: {type: String},
    welcomeMessage: {type: String},
    leaverChannel: {type: String},
    leaverMessage: {type: String},
    verifyChannel: {type: String},
    verifyRole: {type: String},
});

module.exports = mongoose.model('PerGuildLogandWelcome', perguildlogandwelcomeSchema);
