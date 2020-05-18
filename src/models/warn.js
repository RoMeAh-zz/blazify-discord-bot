const mongoose = require("mongoose");

const warnsSchema = mongoose.Schema({
  userName: {type: String},
    userID: {type: String},
    guildID: {type: String},
    warns: {type: String}
});

module.exports = mongoose.model("Warn", warnsSchema);