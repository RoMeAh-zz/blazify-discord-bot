import {TextChannel , Util} from "discord.js";
import { AkairoClient } from "discord-akairo";
import db from "quick.db"
export function handleUploads(client : AkairoClient , channel_id : string , discord_channel : string , ytwatchInterval : number , messageTemplate : string) {
    if (db.fetch(`postedVideos`) === null)
        db.set(`postedVideos`, []);
    setInterval(() => {
            client.request
                .parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel_id}`)
                .then(data => {
                    // @ts-ignore
                    if (db.fetch(`postedVideos`)
                        //@ts-ignore
                        .includes(data.items[0].link)) return;
                    else {
                        //@ts-ignore
                        db.set(`videoData`, data.items[0]);
                        //@ts-ignore
                        db.push("postedVideos", data.items[0].link);
                        let parsed = db.fetch(`videoData`);
                        // @ts-ignore
                        let channel: TextChannel | undefined = client.channels.cache.get(discord_channel);
                        if (!channel) return;
                        let message = messageTemplate
                            .replace(/{author}/g, parsed.author)
                            .replace(/{title}/g, Util.escapeMarkdown(parsed.title))
                            .replace(/{url}/g, parsed.link);
                        channel.send(message);
                    }
                });
        },

        ytwatchInterval);
}