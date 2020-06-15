import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class Play extends Command {
    public constructor() {
        super ("play", {
            aliases: ["play", "song"],
            category: "Music",
            description: {
                content: "Plays a Song",
                examples: [
                    "<<play believer"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "song",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `${msg.author} please tell a song to play....`,
                    }
                }
            ]
        });
    }
    public async exec(message : Message, { song }: { song: string }) : Promise<any> {
        if(!message.member?.voice.channel) return message.util?.send(`${message.author} you are not present in any voice channel.`)
        // @ts-ignore
        let player = await this.client.lava.playerCollection.get(message.guild.id)
        if(!player) return message.util?.send("Please use the <<join Command before using this command. K thnx...")
        let queue = player.queue;
        let Song = await player.lavaSearch(song, message.member, true)
        if(!Song) message.util?.send("No Results Found")
        if (Song && Array.isArray(Song)) {
            let index = 1;
            const tracks = Song.slice(0, 5);
            const embed = new MessageEmbed()
                .setAuthor("Song Selection.", message.author.displayAvatarURL({dynamic: true}))
                .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");
            await message.channel.send(embed);
            const collector = message.channel.createMessageCollector(m => {
                return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
            }, { time: 30000, max: 1});
            collector.on("collect", m => {
                if (/cancel/i.test(m.content)) return collector.stop("cancelled")
                const track = tracks[Number(m.content) - 1];
                queue.add(track);
                if(!player.playState) player.play();
            });
            collector.on("end", (_, reason) => {
                if(["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection.")
            });
        } else {
            queue.add(Song);
            if(!player.playState) player.play();
        }
    }
}