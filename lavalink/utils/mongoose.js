const mongoose = require("mongoose");

module.exports = {
  init: () => {
    
    mongoose.connect("mongodb+srv://SecondRomeah:itc12345@mongodbxpcoinsystem-cjqmq.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
    
    mongoose.connection.on('connected', () => {
      console.log("Connected to MongoDB Database for xpcoins, xp with levels, economy system, prefixes ,per-guild settings.");
    });
    
    mongoose.connection.on('err', err => {
      console.error(`Mongoose connection error: \n ${err.stack}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection disconnected');
    });
    
  }
};