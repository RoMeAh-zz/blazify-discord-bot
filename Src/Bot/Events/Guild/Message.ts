import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import { Repository } from "typeorm";
import { GuildSettings } from "../../../Lib";
import { UserXP } from "../../../Lib";

export default class MessageListener extends Listener {
    public constructor() {
        super("message", {
            emitter: "client",
            event: "message",
            category: "guild"
        })
    }

    public async exec(message: Message): Promise<any> {
        if (!message.guild) return message.util?.send("Commands not allowed in DMs")
        const guildSetting: Repository<GuildSettings> = this.client.db.getRepository(GuildSettings)
        const XP: Repository<UserXP> = this.client.db.getRepository(UserXP)
        const exp = guildSetting.findOne({guild: message.guild.id, enableXP: true})
        const expcoins = guildSetting.findOne({guild: message.guild.id, enableXPCoins: true})

        if (!exp) {
            let addXP = Math.floor(Math.random() * 10 + 1);
            let xp = await XP.findOne(
                {user: message.author.id, guild: message.guild.id});
            if (!xp) {
                await XP.insert({
                    user: message.author.id,
                    guild: message.guild?.id,
                    xp: addXP,
                    level: 1,
                });
            }

            xp!.xp = xp?.xp! + addXP;
            let nextLevel = xp?.level! * 300 * xp?.level!;

            if (nextLevel <= xp!.xp) {
                xp!.level = xp?.level! + 1;

                return message.util?.send(
                    `${message.author.tag} has hit level ${xp?.level}`
                );
            }
        }

        if (expcoins) {
            let coinstoadd = Math.ceil(Math.random() * 5) + 5;
            let money = await XP.findOne({
                user: message.author.id,
                guild: message.guild.id,
            })
            if (!money) {
                await XP.insert({
                    user: message.author.id,
                    guild: message.guild?.id,
                    xpcoins: Number(coinstoadd),
                });
            } else {
                money.xpcoins! += coinstoadd;
            }
        }
        const repo = await guildSetting.findOne({guild: message.guild?.id});
        this.client.prefix = repo!.prefix || "b3";
        this.client.commandHandler.prefix = this.client.prefix;
    }
}