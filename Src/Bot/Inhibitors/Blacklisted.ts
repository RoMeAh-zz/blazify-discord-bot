import { Inhibitor } from "discord-akairo";
import {Message} from "discord.js";
import {Repository} from "typeorm";
import {User} from "../../Lib";

export default class Blacklisted extends Inhibitor {
    public constructor() {
        super("blacklisted", {
            reason: "You have been Blacklisted"
        });
    }
    public async exec(message: Message): Promise<any> {
        const Blacklisted: Repository<User> = this.client.db.getRepository(User)
        let nobc = await Blacklisted.findOne({user: message.author.id, blacklisted: true})
        if(nobc) return;
    }
}