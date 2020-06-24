import { Listener } from "discord-akairo";
import { Guild } from "discord.js";
import { Repository } from "typeorm";
import { GuildSettings } from "../../../Lib";
import { TextChannel } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class GuildCreate extends Listener {
    constructor() {
        super("guildcreate", {
            emitter: "client",
            event: "guildCreate",
            category: "clientguild"
    })
}
public async exec(guild: Guild) {
    this.client.logger.info(`Joined ${guild.name} and has ${guild.members.cache.size}`)
    const guildRepo: Repository<GuildSettings> = this.client.db.getRepository(GuildSettings);
    let exists = await guildRepo.findOne({guild: guild.id})

    if(!exists) {
        await guildRepo.insert({
        guild: guild.id,
        prefix: "b3",
        enableXPCoins: false,
        enableXP: false,
        enableCaptcha: false,
        enableVerification: false,
        enableAntiSpam: true,
        enableModeration: true,
        enableFun: true,
        enableGiveaway: true,
        enableEconomy: true,
        enableMusic: true,
        enableGaming: true,
        enableUtility: true,
        enableWelcome: false,
        logChannel: "logs",
        reportChannel: "reports",
        welcomeChannel: "welcome",
        welcomeMessage: "${member.name} Welcome to ${message.guild.name}.",
        leaverChannel: "leavers",
        leaverMessage: "${member.user.tag} Betrayed ${message.guild.name}.",
        verifyChannel: "verify",
        verifyRole: "Verified"
        })

        await this.client.logger.info(`Added ${guild.name} to the Database`)
    }
    let poop = guild.iconURL()
    if(!poop) return poop = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi0.wp.com%2Fpulse.seattlechildrens.org%2Fwp-content%2Fuploads%2FPoop-Emoji-300x294.jpg%3Fresize%3D230%252C226&imgrefurl=https%3A%2F%2Fpulse.seattlechildrens.org%2Fits-a-messy-topic-but-lets-talk-about-poop%2F&tbnid=GQND62tATFZ8_M&vet=12ahUKEwj9gdCOwprqAhXDFisKHd9VAXYQMygAegUIARDZAQ..i&docid=XyKH0KynbcQYkM&w=230&h=226&q=poop&client=opera&ved=2ahUKEwj9gdCOwprqAhXDFisKHd9VAXYQMygAegUIARDZAQ"
    let gc = await (this.client.channels.cache.get("718324512759873576") as TextChannel)
    gc.send(new MessageEmbed()
    .setAuthor(this.client.user?.username)
    .setImage(poop)
    .setDescription(`The name of the Guild: ${guild.name}\n
    Owner Name: ${guild.owner}
    Member Count: ${guild.members.cache.size}
    Joined at: ${Date.now()}`)
    .setColor("RED")
    )
}
}