const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
    userID: String,
    book: { type: Number, default: 0 } 
});

const ItemsModel = mongoose.model('Items', ItemsSchema);
module.exports = ItemsModel;
