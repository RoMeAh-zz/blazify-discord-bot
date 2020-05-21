const Route = require("../lib/Route");
const { Permissions } = require("discord.js");
module.exports = class extends Route {
  constructor() {
    super("/api/guilds");
  }

  async run(client, app, req, res) {
    if (!req.query.access_token) return res.json({ success: false });
    try {
      let guilds = await client.oauth.getUserGuilds(req.query.access_token);
      guilds = guilds
        .filter((guild) =>
          new Permissions(guild.permissions).has("MANAGE_GUILD", true)
        )
        .map((guild) => ({
          ...guild,
          manageable: client.guilds.cache.has(guild.id),
        }));
      res.json({ success: true, data: guilds });
    } catch (e) {
      res.json({ success: false });
    }
  }
};
