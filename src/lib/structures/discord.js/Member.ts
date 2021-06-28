import { Structures } from "discord.js";
import { MemberEntity } from "../../entity/Member";

export default Structures.extend("GuildMember", (Member) => {
  return class BlazifyMember extends Member {
    public db = MemberEntity;
    public async entity(): Promise<MemberEntity | undefined> {
      return await this.db.findOne({ id: this.id });
    }

    public async initDB(options: Partial<MemberEntity> = {}) {
      if (!(await this.entity()))
        await this.db.insert({ id: this.id, guild: this.guild.id, ...options });
    }
  };
});
