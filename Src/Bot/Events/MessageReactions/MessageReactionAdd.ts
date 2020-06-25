import { Listener } from "discord-akairo";
import { MessageReaction } from "discord.js";
import { User } from "discord.js";
import { Repository } from "typeorm";
import { RoleReaction } from "../../../Lib";

export default class MessageReactionAdd extends Listener {
    constructor() {
        super("messageReactionAdd", {
            emitter: "client" ,
            event: "messageReactionAdd" ,
            category: "MessageReactions"
        })
    }
    public async exec(reaction: MessageReaction, user: User): Promise<void> {
        this.client.logger.info("Event?")
        const message = reaction.message;
        const RoleRepo: Repository<RoleReaction> =  this.client.db.getRepository(RoleReaction)
       const roleDocument = await RoleRepo.findOne({ message: message.id });

       if (!roleDocument) return;

       const emojiID = reaction.emoji?.id;

       if (roleDocument?.emojiRoleMappings![0] === emojiID) {
        const roleID = roleDocument?.emojiRoleMappings![1];
        const addRole = message.guild?.roles.cache.get(roleID);

        if (!addRole) return;

        const addto = message.guild?.members.cache.get(user.id);
        
        if (addto?.roles.cache.has(addRole.id)) {
            return;
        } else {
            await addto?.roles.add(addRole.id);
            this.client.logger.info("added");
        };
       };
    }
}