const mongoose = require("mongoose");

const coinsSchema = mongoose.Schema({
  userName: {type: String},
    userID: {type:String},
    coins: {type:Number}
});

module.exports = mongoose.model("Coins", coinsSchema);