const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
    userID: {type:String },
    serverID: {type:String},
    money: {type:Number}

})

module.exports = mongoose.model("Money", moneySchema);