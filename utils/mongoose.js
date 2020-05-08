const mongoose = require("mongoose");

module.exports = {
  init: () => {

    mongoose.connect("create a cluster and put link here", { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('connected', () => {
      console.log("Connected to MongoDB Database.");
    });

    mongoose.connection.on('err', err => {
      console.error(`Mongoose connection error: \n ${err.stack}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection disconnected');
    });

  }
};
