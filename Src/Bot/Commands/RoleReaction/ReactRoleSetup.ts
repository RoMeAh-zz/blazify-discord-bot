import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MessageCollector } from "discord.js";
import { TextChannel } from "discord.js";
import { Repository } from "typeorm";
import { RoleReaction } from "../../../Lib";
import { Emoji } from "discord.js";

export default class PingCommand extends Command {
    public constructor() {
        super("reactrolesetup", {
            aliases: ["reactrolesetup", "rr"],
            category: "RoleReaction",
            description: {
                content: "Setup Role Reaction?",
                usage: "<<rr",
                examples: [
                    "rr"
                ]
            },
            ratelimit: 3,
            args: [
                {
                        id: "msg",
                        type: async (message : Message , str : string) => {
                            let rawmsg = await (message.guild?.channels.cache.get ( message.channel.id ) as TextChannel).messages.fetch ( (str) , true )
                                    .catch ( () => null );
                                    return rawmsg?.id
                        },
                        prompt: {
                            start: (msg : Message) => `${msg.author}, you must provide a message!` ,
                            retry: (msg : Message) => `${msg.author}, you must provide a valid message!(Hint: This command should be used in the channel in which the giveaway is present)`
                        }
                    
                }
            ]
        });
    }

    public async exec(message: Message, { msg }: { msg: string }): Promise<Message> {
        let msgCollectorFilter = (newMsg: { author: { id: string; }; }, originalMsg: { author: { id: string; }; }) => newMsg.author.id === originalMsg.author.id;
        const MessageModel: Repository<RoleReaction> =  this.client.db.getRepository(RoleReaction)
             try {
                 let fetchedMessage = await message.channel.messages.fetch(msg);
                 if(fetchedMessage) {
                     await message.util?.send("Please provide all of the emoji names with the role name, one by one, separated with a comma.\ne.g: snapchat, snapchat, where the emoji name comes first, role name comes second.");
                     let collector = new MessageCollector(message.channel as TextChannel, msgCollectorFilter.bind(null, message));
                     let emojiRoleMappings: Array<string>;
                     collector.on('collect', (msg: Message) => {
                         if(msg.content.toLowerCase() === 'done') {
                             collector.stop('done command was issued.');
                             return;
                         }
                         let [ emojiName, roleName ] = msg.content.split(/,\s+/);
                         if(!emojiName && !roleName) return;
                         let emoji = msg.guild?.emojis.cache.get(emojiName)
                         if(!emoji) {
                             msg.channel.send("Emoji does not exist. Try again.")
                                 .then((msg) => msg.delete({ timeout: 2000 }))
                                 .catch((err: string) => this.client.logger.info(err));
                             return;
                         }
                         let role = msg.guild?.roles.cache.find((role: { name: string; }) => role.name.toLowerCase() === roleName.toLowerCase());
                         if(!role) {
                             msg.channel.send("Role does not exist. Try again.")
                                 .then((msg) => msg.delete({ timeout: 2000 }))
                                 .catch((err: string) => this.client.logger.info(err));
                             return;
                         }
                         fetchedMessage.react(emoji)
                             .then(emoji => this.client.logger.info("Reacted." + emoji))
                             .catch(err => this.client.logger.info(err));
                         emojiRoleMappings = [emoji.id, role.id];
                     });
                     collector.on('end', async (collected, reason: string) => {
                         let findMsgDocument = await MessageModel
                             .findOne({ message: fetchedMessage.id })
                             .catch((err: string) => this.client.logger.info(err));
                         if(findMsgDocument) {
                             this.client.logger.info("The message exists.. Don't save...");
                             return message.util?.send("A role reaction set up exists for this message already...");
                         }
                         else {
                              MessageModel.insert({
                                 message: fetchedMessage.id,
                                 emojiRoleMappings
                             });
                         }
                     });
                 }
             }
             catch(err) {
                 this.client.logger.info(err);
                 let msg = await message.util?.send("Invalid id. Message was not found.");
                 await msg?.delete({ timeout: 3500 }).catch(err => this.client.logger.info(err));
             }
             return message.delete();
         }

    }