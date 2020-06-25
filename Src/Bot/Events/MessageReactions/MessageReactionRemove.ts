import { Listener } from "discord-akairo";
import { MessageReaction } from "discord.js";
import { User } from "discord.js";
import { Repository } from "typeorm";
import { RoleReaction } from "../../../Lib";

export default class MessageReactionAdd extends Listener {
    constructor() {
        super("messageReactionRemove", {
            emitter: "client" ,
            event: "messageReactionRemove" ,
            category: "MessageReactions"
        })
    }
    public async exec(messageReaction: MessageReaction, user: User): Promise<void> {
        const message = messageReaction.message;
        const RoleRepo: Repository<RoleReaction> =  this.client.db.getRepository(RoleReaction)
       const roleDocument = await RoleRepo.findOne({ message: message.id });

       if (!roleDocument) return;

       const emojiID = messageReaction.emoji?.id;

       if (roleDocument?.emojiRoleMappings![0] === emojiID) {
        const roleID = roleDocument.emojiRoleMappings[1];
        const addRole = message.guild?.roles.cache.get(roleID);

        if (!addRole) return;

        const addto = message.guild?.members.cache.get(user.id);
        
        if (addto?.roles.cache.has(addRole.id)) {
            await addto?.roles.remove(addRole.id);
            this.client.logger.info("removed");
          } else {
            return;
          };
        };
       };
    }