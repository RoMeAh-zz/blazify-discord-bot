"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploads = void 0;
const discord_js_1 = require("discord.js");
const quick_db_1 = __importDefault(require("quick.db"));
function handleUploads(client, channel_id, discord_channel, ytwatchInterval, messageTemplate) {
    if (quick_db_1.default.fetch(`postedVideos`) === null)
        quick_db_1.default.set(`postedVideos`, []);
    setInterval(() => {
        client.request
            .parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel_id}`)
            .then(data => {
            // @ts-ignore
            if (quick_db_1.default.fetch(`postedVideos`)
                //@ts-ignore
                .includes(data.items[0].link))
                return;
            else {
                //@ts-ignore
                quick_db_1.default.set(`videoData`, data.items[0]);
                //@ts-ignore
                quick_db_1.default.push("postedVideos", data.items[0].link);
                let parsed = quick_db_1.default.fetch(`videoData`);
                // @ts-ignore
                let channel = client.channels.cache.get(discord_channel);
                if (!channel)
                    return;
                let message = messageTemplate
                    .replace(/{author}/g, parsed.author)
                    .replace(/{title}/g, discord_js_1.Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link);
                channel.send(message);
            }
        });
    }, ytwatchInterval);
}
exports.handleUploads = handleUploads;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWW91VHViZVZpZGVvTm90aWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9TcmMvTGliL1N0cnVjdHVyZXMvWW91VHViZVZpZGVvTm90aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkNBQThDO0FBRTlDLHdEQUF5QjtBQUN6QixTQUFnQixhQUFhLENBQUMsTUFBcUIsRUFBRyxVQUFtQixFQUFHLGVBQXdCLEVBQUcsZUFBd0IsRUFBRyxlQUF3QjtJQUN0SixJQUFJLGtCQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUk7UUFDakMsa0JBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDVCxNQUFNLENBQUMsT0FBTzthQUNULFFBQVEsQ0FBQyx1REFBdUQsVUFBVSxFQUFFLENBQUM7YUFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsYUFBYTtZQUNiLElBQUksa0JBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO2dCQUN4QixZQUFZO2lCQUNYLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFBRSxPQUFPO2lCQUNyQztnQkFDRCxZQUFZO2dCQUNaLGtCQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLFlBQVk7Z0JBQ1osa0JBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVDLElBQUksTUFBTSxHQUFHLGtCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNuQyxhQUFhO2dCQUNiLElBQUksT0FBTyxHQUE0QixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2xGLElBQUksQ0FBQyxPQUFPO29CQUFFLE9BQU87Z0JBQ3JCLElBQUksT0FBTyxHQUFHLGVBQWU7cUJBQ3hCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztxQkFDbkMsT0FBTyxDQUFDLFVBQVUsRUFBRSxpQkFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RELE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDLEVBRUQsZUFBZSxDQUFDLENBQUM7QUFDekIsQ0FBQztBQTlCRCxzQ0E4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RleHRDaGFubmVsICwgVXRpbH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IEFrYWlyb0NsaWVudCB9IGZyb20gXCJkaXNjb3JkLWFrYWlyb1wiO1xuaW1wb3J0IGRiIGZyb20gXCJxdWljay5kYlwiXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlVXBsb2FkcyhjbGllbnQgOiBBa2Fpcm9DbGllbnQgLCBjaGFubmVsX2lkIDogc3RyaW5nICwgZGlzY29yZF9jaGFubmVsIDogc3RyaW5nICwgeXR3YXRjaEludGVydmFsIDogbnVtYmVyICwgbWVzc2FnZVRlbXBsYXRlIDogc3RyaW5nKSB7XG4gICAgaWYgKGRiLmZldGNoKGBwb3N0ZWRWaWRlb3NgKSA9PT0gbnVsbClcbiAgICAgICAgZGIuc2V0KGBwb3N0ZWRWaWRlb3NgLCBbXSk7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgY2xpZW50LnJlcXVlc3RcbiAgICAgICAgICAgICAgICAucGFyc2VVUkwoYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2ZlZWRzL3ZpZGVvcy54bWw/Y2hhbm5lbF9pZD0ke2NoYW5uZWxfaWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBpZiAoZGIuZmV0Y2goYHBvc3RlZFZpZGVvc2ApXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pbmNsdWRlcyhkYXRhLml0ZW1zWzBdLmxpbmspKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5zZXQoYHZpZGVvRGF0YWAsIGRhdGEuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5wdXNoKFwicG9zdGVkVmlkZW9zXCIsIGRhdGEuaXRlbXNbMF0ubGluayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VkID0gZGIuZmV0Y2goYHZpZGVvRGF0YWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWw6IFRleHRDaGFubmVsIHwgdW5kZWZpbmVkID0gY2xpZW50LmNoYW5uZWxzLmNhY2hlLmdldChkaXNjb3JkX2NoYW5uZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGFubmVsKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG1lc3NhZ2VUZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC97YXV0aG9yfS9nLCBwYXJzZWQuYXV0aG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC97dGl0bGV9L2csIFV0aWwuZXNjYXBlTWFya2Rvd24ocGFyc2VkLnRpdGxlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgve3VybH0vZywgcGFyc2VkLmxpbmspO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgeXR3YXRjaEludGVydmFsKTtcbn0iXX0=