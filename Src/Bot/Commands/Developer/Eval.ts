//@ts-nocheck

import { Message, MessageEmbed } from "discord.js";
import { inspect } from "util";
import { Command } from "discord-akairo";

export default class Eval extends Command {
    public constructor() {
        super("eval", {
            aliases: ["eval", "evaluate"],
            category: "Developer",
            description: {
                content: "Evaluate?",
                usage: "<<eval",
                examples: [
                    "eval"
                ]
            },
            ratelimit: 3,
            ownerOnly: true,
            args: [
                {
                    id: "code",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `${msg.author} please tell a valid code to eval....`,
                    }
                }
            ]
        });
    }

    public async exec(message : Message, {code}: {code: string}) : Promise<Message> {
        let returnEmbed;

        try {
            // we declare d as the Date timestamp when the evaluation started
            let d = Date.now ();

            // here we evaluate the input
            let evaluated = await eval ( `${code}` );

            const evalType = evaluated ? evaluated.constructor.name : undefined;

            if (typeof evaluated !== "string") {
                // we format the output as string
                evaluated = inspect ( evaluated , {
                    depth: 0
                } );
            }
            if (evaluated.length >= 1024) {
                const {key} = await (
                    await fetch ( "https://hasteb.in/documents" , {
                        body: evaluated ,
                        method: "POST"
                    } )
                ).json ();

                evaluated = `https://hasteb.in/${key}`;
            }

            returnEmbed = new MessageEmbed ()
                .setTitle ( "Evaluation Output" )
                .addField ( "Input" , toJS ( code ) )
                .setDescription (
                    evaluated.startsWith ( "https://hasteb.in" )
                        ? `[Full Output](${evaluated})`
                        : toJS ( evaluated )
                )
                .addField ( "Type" , toJS ( evalType ) )
                .setFooter ( `Evaluated in: ${Date.now () - d}ms` );
        } catch (e) {
            // if there was an error it's going to return this embed
            returnEmbed = new MessageEmbed()
                .setTitle ( "Evaluation Error" )
                .addField ( "Input" , toJS ( code ))
                .addField ( "Error" , toJS ( e ) );
        }

        return message.channel.send ( returnEmbed );
    }
};

function toJS(input: string): string {
    return `\`\`\`js\n${input}\`\`\``;
}