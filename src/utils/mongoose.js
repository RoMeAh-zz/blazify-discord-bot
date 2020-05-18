const mongoose = require("mongoose");

module.exports = {
  init: () => {
    mongoose.connect(
      "mongodb+srv://SecondRomeah:itc12345@mongodbxpcoinsystem-cjqmq.mongodb.net/test?authSource=admin&replicaSet=mongodbxpcoinsystem-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB Database.");
    });

    mongoose.connection.on("err", (err) => {
      console.error(`Mongoose connection error: \n ${err.stack}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose connection disconnected");
    });
  },
};
