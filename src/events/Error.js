class Error {
    constructor(client) {
      this.client = client;
    } 
    run(error) {
      console.log(`Websocket error:\n${error}`);
    }
  }
  module.exports = Error;