const { Client, Collection } = require("discord.js");
const { readdir, readdirSync } = require ( "fs" );
const { nodes } = require ( "../config.json" );
const { Manager } = require ( "lavaclient" );
const ascii = require("ascii-table");

Manager.use(new (require("../utils/BlazifyMusic"))());

class BlazifyClient extends Client {
  constructor(options) {
      super ( { partials : ["REACTION", "MESSAGE"] }, (options.clientOptions || {}) );
      this.commands = new Collection ();
      this.aliases = new Collection ();
      this.config = options.config ? require ( `../${options.config}` ) : {};
      this.perms = options.perms ? require ( `../${options.perms}` ) : {};
      console.log ( `Client initialised. You are using node ${process.version}.` );
      this.mongoose = require ( "../utils/mongoose.js" );
      this.afk = new Map ();
      this.levels = new Map ( [
          ["none", 0],
          ["low", 0.25],
          ["medium", 0.5],
          ["high", 0.75],
      ] );
      this.mongoose.init ();
         this.lava = new Manager(nodes, {
         shards: this.shard ? this.shard.count : 1,
         send: (id, payload) => {
           const guild = this.guilds.cache.get(id);
           if (guild) guild.shard.send(payload);
           return;
         },
       });
       this.ws.on("VOICE_SERVER_UPDATE", _ => this.lava.serverUpdate(_));
       this.ws.on("VOICE_STATE_UPDATE", _ => this.lava.stateUpdate(_));
  }
  login(token) {
    super.login(token);
   return this;
  }
loadCommands() {
  let table = new ascii("Commands");
  table.setHeading("Command", "Load status");
  readdirSync("./commands/").forEach(dir => {
    const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    for (let file of commands) {
        let command = new (require(`../commands/${dir}/${file}`))(this);
        if (command.help.name) {
            this.commands.set(command.help.name, command);
            table.addRow(file, '✅');
        } else {
            table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
            continue;
        }
        if (command.conf.aliases && Array.isArray(command.conf.aliases)) command.conf.aliases.forEach(alias => this.aliases.set(alias, command.help.name))
    }
});
console.log(table.toString());
  return this;
}
loadEvents(path) {
  let table1 = new ascii("Event");
  table1.setHeading("Event", "Load status");
  readdir(path, (err, files) => {
      if (err) console.log(err);
      files.forEach(evt => {
          const event = new (require(`../${path}/${evt}`))(this);
        super.on(evt.split(".")[0], (...args) => event.run(...args));
        table1.addRow(evt, '✅')
      });
      console.log(table1.toString());
  });
  return this;
  }
}
module.exports = BlazifyClient;
