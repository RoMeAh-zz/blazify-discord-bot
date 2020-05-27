const mongoose = require('mongoose');
//mongoose is used
const prefixSchema = new mongoose.Schema({
    guildID: {type: String},
    prefix: {type: String}
});

module.exports = mongoose.model('Prefix', prefixSchema);