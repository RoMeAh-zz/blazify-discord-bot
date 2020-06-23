import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MessageCollector } from "discord.js";
import { TextChannel } from "discord.js";
import { Repository } from "typeorm";
import { RoleReaction } from "../../../Lib/Database/Models/RoleReaction";

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
                                // @ts-ignore
                            let rawmsg = await (message.guild.channels.cache.get ( message.channel.id ) as TextChannel).messages.fetch ( (str) , true )
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

    public async exec(message: Message, { msg }: { msg: string }): Promise<any> {
        let msgCollectorFilter = (newMsg: { author: { id: string; }; }, originalMsg: { author: { id: string; }; }) => newMsg.author.id === originalMsg.author.id;
        const MessageModel: Repository<RoleReaction> =  this.client.db.getRepository(RoleReaction)
        if(msg.length !== 1) {
            let msg = await message.channel.send("Too many arguments. Must only provide 1 message id");
            await msg.delete({ timeout: 3500 }).catch(err => console.log(err));
        } else {
             try {
                 let fetchedMessage = await message.channel.messages.fetch(msg);
                 if(fetchedMessage) {
                     await message.util?.send("Please provide all of the emoji names with the role name, one by one, separated with a comma.\ne.g: snapchat, snapchat, where the emoji name comes first, role name comes second.");
                     let collector = new MessageCollector(message.channel as TextChannel, msgCollectorFilter.bind(null, message));
                     let emojiRoleMappings: Array<string>;
                     collector.on('collect', (msg: { guild: { emojis: { cache: any; }; roles: { cache: any[]; }; }; content: { toLowerCase: () => string; split: (arg0: RegExp) => [any, any]; }; channel: { send: (arg0: string) => Promise<any>; }; }) => {
                         let { cache } = msg.guild.emojis;
                         if(msg.content.toLowerCase() === 'done') {
                             collector.stop('done command was issued.');
                             return;
                         }
                         let [ emojiName, roleName ] = msg.content.split(/,\s+/);
                         if(!emojiName && !roleName) return;
                         let emoji = cache.find((emoji: { name: string; }) => emoji.name.toLowerCase() === emojiName.toLowerCase());
                         if(!emoji) {
                             msg.channel.send("Emoji does not exist. Try again.")
                                 .then((msg: { delete: (arg0: { timeout: number; }) => any; }) => msg.delete({ timeout: 2000 }))
                                 .catch((err: any) => console.log(err));
                             return;
                         }
                         let role = msg.guild.roles.cache.find((role: { name: string; }) => role.name.toLowerCase() === roleName.toLowerCase());
                         if(!role) {
                             msg.channel.send("Role does not exist. Try again.")
                                 .then((msg: { delete: (arg0: { timeout: number; }) => any; }) => msg.delete({ timeout: 2000 }))
                                 .catch((err: any) => console.log(err));
                             return;
                         }
                         console.log(fetchedMessage);
                         fetchedMessage.react(emoji)
                             .then(emoji => console.log("Reacted."))
                             .catch(err => console.log(err));
                         emojiRoleMappings.push(emoji.id, role.id);
                     });
                     collector.on('end', async (collected: any, reason: any) => {
                         let findMsgDocument = await MessageModel
                             .findOne({ message: fetchedMessage.id })
                             .catch((err: any) => console.log(err));
                         if(findMsgDocument) {
                             console.log("The message exists.. Don't save...");
                             message.channel.send("A role reaction set up exists for this message already...");
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
                 console.log(err);
                 let msg = await message.channel.send("Invalid id. Message was not found.");
                 await msg.delete({ timeout: 3500 }).catch(err => console.log(err));
             }
         }

    }}