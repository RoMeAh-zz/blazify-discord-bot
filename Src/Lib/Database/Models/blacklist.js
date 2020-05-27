const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
    userID: {type:String},
    blacklisted: {type: Boolean, default: false},
});

module.exports = mongoose.model("Blacklist", blacklistSchema);
