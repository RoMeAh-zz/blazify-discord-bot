import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { MessageCollector } from "discord.js";
import { TextChannel } from "discord.js";
import { Repository } from "typeorm";
import { RoleReaction } from "../../../Lib/Database/Models/RoleReaction";
import { User } from "discord.js";

export default class PingCommand extends Command {
    public constructor() {
        super("reactroleedit", {
            aliases: ["reactroleedit", "re"],
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
        // Check if the message exists.
        const { channel, author } = message;
        const MessageModel: Repository<RoleReaction> =  this.client.db.getRepository(RoleReaction)
        try {
            let fetchedMessage = channel.messages.cache.get(msg) || await channel.messages.fetch(msg);
            if(!fetchedMessage)
                channel.send("Message not found.");
            else {
                // Check if the message exists in the DB.
                let msgModel = await MessageModel.findOne({ message: msg });
                if(msgModel) {
                    // Prompt the user for configurations.
                    let filter = (m: { author: { id: string; }; content: string; }) => m.author.id === author.id && (m.content.toLowerCase() === 'add' || m.content.toLowerCase() === 'remove');
                    let tempMsg = channel.send("Do you want to add or remove from the reaction configuration? Type add or remove");
                    try {
                        let awaitMsgOps = { max: 1, time: 4000, errors: ['time'] };
                        let choice = (await channel.awaitMessages(filter, awaitMsgOps)).first();
                        if(choice?.content === "add") {
                            let addMsgPrompt = await channel.send("Enter an emoji name followed by the corresponding role name, separated with a comma. e.g: some_emoji, some_role");
                            let collectorResult = await handleCollector(fetchedMessage, author, channel, msgModel!.emojiRoleMappings, msg);
                            console.log(collectorResult);
                        }
                        else {

                        }
                    }
                    catch(err) {
                        console.log(err);
                    }
                }
                else {
                    message.channel.send("There is no configuration for that message. Please use ?addreactions on a message to set up Role Reactions on that message.")
                }
            }
        }
        catch(err) {
            console.log(err);
        }
    }
}
function handleCollector(fetchedMessage: Message, author: User, channel: TextChannel | import("discord.js").DMChannel | import("discord.js").NewsChannel, msgModel: string[] | undefined, message: any) {
    return new Promise((resolve, reject) => {
        let collectorFilter = (m: { author: { id: any; }; }) => m.author.id === author.id;
        let collector = new MessageCollector(channel as TextChannel, collectorFilter);
        let emojiRoleMappings: Array<string>;
        collector.on('collect', msg => {
            if(msg.content.toLowerCase() === '?done') {
                collector.stop();
                resolve();
            }
            else {
                let { cache } = msg.guild.emojis;
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
                fetchedMessage.react(emoji)
                    .then((emoji: any) => console.log("Reacted."))
                    .catch((err: any) => console.log(err));
                emojiRoleMappings.push(emoji.id, role.id);
            }
        });
        collector.on('end', () => {
            console.log("Done...");
            resolve(emojiRoleMappings);
        });
    });
    }