import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import { Repository } from "typeorm";
import { GuildSettings } from "../../../Lib/Database/Models/GuildSettings";
import { UserXP } from "../../../Lib/Database/Models/UserXP";

export default class MessageListener extends Listener {
    public constructor() {
        super ("message" , {
            emitter: "client" ,
            event: "message" ,
            category: "guild"
        })
    }

    public async exec(message: Message) : Promise<any> {
        if(!message.guild) return message.util?.send("Commands not allowed in DMs")
        const guildSetting: Repository<GuildSettings> =  this.client.db.getRepository(GuildSettings)
        const XP: Repository<UserXP> =  this.client.db.getRepository(UserXP)
        const exp = guildSetting.findOne({guild: message.guild.id, enableXP: true})
        const expc = guildSetting.findOne({guild: message.guild.id, enableXPCoins: true})

        if (!exp) {
          let addXP = Math.floor(Math.random() * 10 + 1);
          await XP.findOne(
            { user: message.author.id, guild: message.guild.id }),
            async (err: any, xp: { xp: number; level: number; save: () => Promise<any>; }) => {
              if (err) console.log(err);
      
              if (!xp) {
                let newXP = XP.insert({
                  user: message.author.id,
                  guild: message.guild?.id,
                  xp: addXP,
                  level: 1,
                });
                newXP = xp;
              };
      
                xp.xp = xp.xp + addXP;
                let nextLevel = xp.level * 300;
      
                if (nextLevel <= xp.xp) {
                  xp.level = xp.level + 1;
      
                  xp.save().catch((err: any) => console.log(err));
                  return message.util?.send(
                    `${message.author.tag} has hit level ${xp.level}`
                  );
                };
      
                xp.save().catch((err: any) => console.log(err));
              
            };
        }
      
        if (expc) {
          let coinstoadd = Math.ceil(Math.random() * 5) + 5;
          XP.findOne({
              user: message.author.id,
              guild: message.guild.id,
            }),
            (err: any, money: { money: number; save: () => Promise<any>; }) => {
              if (err) console.log(err);
              if (!money) {
                 XP.insert({
                  user: message.author.id,
                  guild: message.guild?.id,
                  xpcoins: Number(coinstoadd),
                });
              } else {
                money.money = money.money + coinstoadd;
                money.save().catch((err: any) => console.log(err));
              }
            };
        }
        var repo = await guildSetting.findOne({ guild: message.guild?.id })
        this.client.prefix = repo!.prefix || "b3";
        this.client.commandHandler.prefix = this.client.prefix;
    }
}