import { Message } from "discord.js"
import { Repository } from "typeorm"
import { GuildSettings } from "../Database/Models/GuildSettings"

export default class PrefixManager  {
    constructor(client: any) {
        client = client
client.on("message", async (message: Message) => {
    if(!message.guild) return message.util?.send("Commands not allowed in DMs")
    const guildSetting: Repository<GuildSettings> =  client.db.getRepository(GuildSettings)
    var repo = await guildSetting.findOne({ guild: message.guild?.id })
    client.prefix = repo!.prefix || "b3";
    client.commandHandler.prefix = client.prefix;
})
    }
}