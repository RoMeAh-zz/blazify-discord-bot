import { Structures } from "discord.js";
import { GuildEntity } from "../../entity/Guild";

export default Structures.extend("Guild", (Guild) => {
  return class BlazifyGuild extends Guild {
    public db = GuildEntity;

    public async entity(): Promise<GuildEntity | undefined> {
      return await this.db.findOne({ id: this.id });
    }

    public async initDB(options: Partial<GuildEntity> = {}) {
      if (!(await this.entity()))
        await this.db.insert({ id: this.id, ...options });
    }
  };
});
