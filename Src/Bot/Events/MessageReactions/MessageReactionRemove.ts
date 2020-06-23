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
    public async exec(messageReaction: MessageReaction, user: User): Promise<any> {
        const message = messageReaction.message;
        const RoleRepo: Repository<RoleReaction> =  this.client.db.getRepository(RoleReaction)
       const roleDocument = await RoleRepo.findOne({ message: message.id });

       if (!roleDocument) return;

       const emojiID: number = Number(messageReaction.emoji?.id);

       if (roleDocument?.emojiRoleMappings?.hasOwnProperty(emojiID)) {
        const roleID = roleDocument.emojiRoleMappings[emojiID];
        const addRole = message.guild?.roles.cache.get(roleID);

        if (!addRole) return;

        const addto = message.guild?.members.cache.get(user.id);
        
        if (addto?.roles.cache.has(addRole.id)) {
            await addto?.roles.remove(addRole.id);
            console.log("removed");
          } else {
            return;
          };
        };
       };
    }