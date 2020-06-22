import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            aliases: ["ping", "pong"],
            category: "Utility",
            description: {
                content: "Check the latency of the bot to the Discord API",
                usage: "<<ping",
                examples: [
                    "ping"
                ]
            },
            ratelimit: 3
        });
    }

    public exec(message: Message): Promise<Message> {
        let Pong: number = Date.now() - message.createdTimestamp
        // @ts-ignore
        return message.util.send(`Pong! **Response Time:** \`${Pong}\`ms. **Discord API Latency:** \`${this.client.ws.ping}\`ms`);
    };
};
