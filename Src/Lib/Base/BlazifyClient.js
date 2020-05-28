const { Client, Collection } = require("discord.js");
const { readdirSync } = require ( "fs" );
const { nodes } = require ( "../../../config.json" );
const { Manager } = require ( "lavaclient" );
const ascii = require("ascii-table");

Manager.use(new (require("../Structures/BlazifyMusic"))());

class BlazifyClient extends Client {
  constructor(options) {
      super ( { partials : ["REACTION", "MESSAGE"] }, (options.clientOptions || {}) );
      this.commands = new Collection ();
      this.aliases = new Collection ();
      this.config = options.config ? require ( `../../${options.config}` ) : {};
      this.perms = options.perms ? require ( `../../${options.perms}` ) : {};
      console.log ( `Client initialised. You are using node ${process.version}.` );
      this.mongoose = require ( "../Database/mongoose.js" );
      this.afk = new Map ();
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
  this.login(token) {
    super.login(token);
   return this;
  }
loadCommands() {
  let table = new ascii("Commands");
  table.setHeading("Command", "Load status");
  readdirSync("./Bot/Commands/").forEach(dir => {
    const commands = readdirSync(`./Bot/Commands/${dir}/`).filter(file => file.endsWith(".js"));
    for (let file of commands) {
        let command = new (require(`../../Bot/Commands/${dir}/${file}`))(this);
        if (command.help.name) {
            this.commands.set(command.help.name, command);
            table.addRow(file, '✅');
        } else {
            table.addRow(file, `❌  -> Classes not used properly.`);
            continue;
        }
        if (command.conf.aliases && Array.isArray(command.conf.aliases)) command.conf.aliases.forEach(alias => this.aliases.set(alias, command.help.name))
    }
});
console.log(table.toString());
  return this;
}
loadEvents() {
  let table1 = new ascii("Event");
  table1.setHeading("Event", "Load status");
    readdirSync("./Bot/Events/").forEach(dir => {
        const events = readdirSync(`./Bot/Events/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of events) {
            const event = new (require(`../../Bot/Events/${dir}/${file}`))(this);
            super.on (file.split ("." )[0], (...args) => event.run ( ...args ) );
            table1.addRow ( file, '✅' )
        }
  });
    console.log(table1.toString());
    return this;
  }
}
module.exports = BlazifyClient;
