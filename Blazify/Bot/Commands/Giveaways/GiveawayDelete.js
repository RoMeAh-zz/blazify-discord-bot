"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const Giveaways_1 = require("../../../Lib/Database/Models/Giveaways");
const GiveawayManager_1 = require("../../../Lib/Structures/GiveawayManager");
class GiveawayDelete extends discord_akairo_1.Command {
    constructor() {
        super("giveaway-delete", {
            aliases: ["gd", "delete-giveaway"],
            category: "Utility",
            description: {
                content: "Edits a Giveaway",
                usage: "<<gd [ msg id ]",
                examples: [
                    "<<gd 531531234545410"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "msg",
                    type: (message, str) => __awaiter(this, void 0, void 0, function* () {
                        // @ts-ignore
                        return yield message.guild.channels.cache.get(message.channel.id).messages.fetch((str), true)
                            .catch(() => null);
                    }),
                    prompt: {
                        start: (msg) => `${msg.author}, you must provide a message!`,
                        retry: (msg) => `${msg.author}, you must provide a valid message!(Hint: This command should be used in the channel in which the giveaway is present)`
                    }
                }
            ]
        });
    }
    exec(_message, { msg }) {
        return __awaiter(this, void 0, void 0, function* () {
            const giveawayRepo = this.client.db.getRepository(Giveaways_1.Giveaways);
            setTimeout(() => {
                GiveawayManager_1.GiveawayManager.delete(giveawayRepo, msg);
            }, 1);
        });
    }
}
exports.default = GiveawayDelete;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2l2ZWF3YXlEZWxldGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9TcmMvQm90L0NvbW1hbmRzL0dpdmVhd2F5cy9HaXZlYXdheURlbGV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1EQUF1QztBQUl2QyxzRUFBaUU7QUFDakUsNkVBQXVFO0FBRXZFLE1BQXFCLGNBQWUsU0FBUSx3QkFBTztJQUMvQztRQUNJLEtBQUssQ0FBRSxpQkFBaUIsRUFBRztZQUN2QixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUcsaUJBQWlCLENBQUM7WUFDbkMsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFO2dCQUNULE9BQU8sRUFBRSxrQkFBa0I7Z0JBQzNCLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLFFBQVEsRUFBRTtvQkFDTixzQkFBc0I7aUJBQ3pCO2FBQ0o7WUFDRCxTQUFTLEVBQUUsQ0FBQztZQUNaLElBQUksRUFBRTtnQkFDRjtvQkFDSSxFQUFFLEVBQUUsS0FBSztvQkFDVCxJQUFJLEVBQUUsQ0FBTyxPQUFpQixFQUFHLEdBQVksRUFBRSxFQUFFO3dCQUM3QyxhQUFhO3dCQUNiLE9BQU8sTUFBTyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRyxJQUFJLENBQUM7NkJBQzVHLEtBQUssQ0FBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUIsQ0FBQyxDQUFBO29CQUNELE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsQ0FBQyxHQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sK0JBQStCO3dCQUN0RSxLQUFLLEVBQUUsQ0FBQyxHQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sd0hBQXdIO3FCQUNsSztpQkFDSjthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVZLElBQUksQ0FBQyxRQUFrQixFQUFHLEVBQUMsR0FBRyxFQUFxQjs7WUFDNUQsTUFBTSxZQUFZLEdBQTJCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBRSxxQkFBUyxDQUFDLENBQUM7WUFDdEYsVUFBVSxDQUFFLEdBQUcsRUFBRTtnQkFDYixpQ0FBZSxDQUFDLE1BQU0sQ0FBRSxZQUFZLEVBQUcsR0FBRyxDQUFDLENBQUE7WUFDL0MsQ0FBQyxFQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztLQUFBO0NBQ0o7QUFwQ0QsaUNBb0NDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbWFuZH0gZnJvbSBcImRpc2NvcmQtYWthaXJvXCI7XG5pbXBvcnQge01lc3NhZ2UgLCBUZXh0Q2hhbm5lbH0gZnJvbSBcImRpc2NvcmQuanNcIjtcblxuaW1wb3J0IHtSZXBvc2l0b3J5fSBmcm9tIFwidHlwZW9ybVwiO1xuaW1wb3J0IHtHaXZlYXdheXN9IGZyb20gXCIuLi8uLi8uLi9MaWIvRGF0YWJhc2UvTW9kZWxzL0dpdmVhd2F5c1wiO1xuaW1wb3J0IHtHaXZlYXdheU1hbmFnZXJ9IGZyb20gXCIuLi8uLi8uLi9MaWIvU3RydWN0dXJlcy9HaXZlYXdheU1hbmFnZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHaXZlYXdheURlbGV0ZSBleHRlbmRzIENvbW1hbmR7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciAoXCJnaXZlYXdheS1kZWxldGVcIiAsIHtcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcImdkXCIgLCBcImRlbGV0ZS1naXZlYXdheVwiXSAsXG4gICAgICAgICAgICBjYXRlZ29yeTogXCJVdGlsaXR5XCIgLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIkVkaXRzIGEgR2l2ZWF3YXlcIiAsXG4gICAgICAgICAgICAgICAgdXNhZ2U6IFwiPDxnZCBbIG1zZyBpZCBdXCIgLFxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiPDxnZCA1MzE1MzEyMzQ1NDU0MTBcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0gLFxuICAgICAgICAgICAgcmF0ZWxpbWl0OiAzICxcbiAgICAgICAgICAgIGFyZ3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm1zZ1wiICxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogYXN5bmMgKG1lc3NhZ2UgOiBNZXNzYWdlICwgc3RyIDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgKG1lc3NhZ2UuZ3VpbGQuY2hhbm5lbHMuY2FjaGUuZ2V0IChtZXNzYWdlLmNoYW5uZWwuaWQpIGFzIFRleHRDaGFubmVsKS5tZXNzYWdlcy5mZXRjaCAoKHN0cikgLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCAoKCkgPT4gbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gLFxuICAgICAgICAgICAgICAgICAgICBwcm9tcHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAobXNnIDogTWVzc2FnZSkgPT4gYCR7bXNnLmF1dGhvcn0sIHlvdSBtdXN0IHByb3ZpZGUgYSBtZXNzYWdlIWAgLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnk6IChtc2cgOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSwgeW91IG11c3QgcHJvdmlkZSBhIHZhbGlkIG1lc3NhZ2UhKEhpbnQ6IFRoaXMgY29tbWFuZCBzaG91bGQgYmUgdXNlZCBpbiB0aGUgY2hhbm5lbCBpbiB3aGljaCB0aGUgZ2l2ZWF3YXkgaXMgcHJlc2VudClgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjKF9tZXNzYWdlIDogTWVzc2FnZSAsIHttc2d9IDogeyBtc2cgOiBNZXNzYWdlIH0pIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgZ2l2ZWF3YXlSZXBvIDogUmVwb3NpdG9yeTxHaXZlYXdheXM+ID0gdGhpcy5jbGllbnQuZGIuZ2V0UmVwb3NpdG9yeSAoR2l2ZWF3YXlzKTtcbiAgICAgICAgc2V0VGltZW91dCAoKCkgPT4ge1xuICAgICAgICAgICAgR2l2ZWF3YXlNYW5hZ2VyLmRlbGV0ZSAoZ2l2ZWF3YXlSZXBvICwgbXNnKVxuICAgICAgICB9ICwgMSlcbiAgICB9XG59OyJdfQ==