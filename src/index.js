const { Client, Collection } = require("discord.js");
const { token, nodes } = require("./config.json");
const { Manager } = require("lavaclient");
const { GiveawaysManager } = require("discord-giveaways");

Manager.use(new (require("./utils/BlazifyMusic"))());

class BlazifyClient extends Client {
  constructor() {
    super({ partials: ["REACTION", "MESSAGE"] });

    this.commands = new Collection();
    this.mongoose = require("./utils/mongoose.js");
    this.afk = new Map();
    this.levels = new Map([
      ["none", 0],
      ["low", 0.25],
      ["medium", 0.5],
      ["high", 0.75],
    ]);
    this.giveawaysManager = new GiveawaysManager(this, {
      storage: "./giveaways.json",
      updateCountdownEvery: 5000,
      default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "🎉",
      },
    });
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

  async load() {
    await Promise.all(
      ["command", "event"].map(async (b) =>
        console.log(await require(`./handlers/${b}`)(this, __dirname))
      )
    );
    return this;
  }
}

new BlazifyClient().load().then((client) => client.login(token));
