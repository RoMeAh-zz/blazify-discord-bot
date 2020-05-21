const { Client, Collection } = require("discord.js");
const { readdir } = require("fs");
const { nodes } = require("../config.json");
const { Manager } = require("lavaclient");

Manager.use(new (require("../utils/BlazifyMusic"))());

class BlazifyClient extends Client {
  constructor(options) {
    super({ partials: ["REACTION", "MESSAGE" ]}, (options.clientOptions || {}));
        this.commands = new Collection();
        this.aliases = new Collection();
        this.config = options.config ? require(`../${options.config}`) : {};
        this.perms = options.perms ? require(`../${options.perms}`) : {};
        console.log(`Client initialised. You are using node ${process.version}.`);
    this.mongoose = require("../utils/mongoose.js");
    this.afk = new Map();
    this.levels = new Map([
      ["none", 0],
      ["low", 0.25],
      ["medium", 0.5],
      ["high", 0.75],
    ]);
    this.lava = new Manager(nodes, {
      shards: this.shard ? this.shard.count : 1,
      send: (id, payload) => {
        const guild = this.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
        return;
      },
    });
    this.mongoose.init();
    this.ws.on("VOICE_SERVER_UPDATE", _ => this.lava.serverUpdate(_));
    this.ws.on("VOICE_STATE_UPDATE", _ => this.lava.stateUpdate(_));
  } 
  login(token) {
    super.login(token);
   return this;
  }
loadCommands(path) {
  const load = dirs => {
  ["Bot-Owner-only", "economy", "Fun", "Gaming", "giveaways", "Moderation", "music", "role", "Utility", "XP & XP COINS"].forEach(x => load(x));
  
  readdir(path, (err, files) => {
      if (err) console.log(err);
      files.forEach(cmd => {
          const command = new (require(`../${path}/${dir}/${cmd}`))(this);
          this.commands.set(command.help.name, command);
          command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
      });
  });
  return this;
}
}
loadEvents(path) {
  readdir(path, (err, files) => {
      if (err) console.log(err);
      files.forEach(evt => {
          const event = new (require(`../${path}/${evt}`))(this);
        super.on(evt.split(".")[0], (...args) => event.run(...args));
      });
  });
  return this;
  }
}
module.exports = BlazifyClient;
