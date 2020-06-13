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
class GiveawayEnd extends discord_akairo_1.Command {
    constructor() {
        super("giveaway-end", {
            aliases: ["gen", "end-giveaway"],
            category: "Utility",
            description: {
                content: "Edits a Giveaway",
                usage: "<<ge [ msg ID ] [ time ] [ prize ]",
                examples: [
                    "<<gc 531531234545410m Discord Nitro"
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
                GiveawayManager_1.GiveawayManager.end(giveawayRepo, msg);
            }, 1);
        });
    }
}
exports.default = GiveawayEnd;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2l2ZWF3YXlFbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9TcmMvQm90L0NvbW1hbmRzL0dpdmVhd2F5cy9HaXZlYXdheUVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1EQUF1QztBQUl2QyxzRUFBaUU7QUFDakUsNkVBQXVFO0FBRXZFLE1BQXFCLFdBQVksU0FBUSx3QkFBTztJQUM1QztRQUNJLEtBQUssQ0FBQyxjQUFjLEVBQUU7WUFDbEIsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLGtCQUFrQjtnQkFDM0IsS0FBSyxFQUFFLG9DQUFvQztnQkFDM0MsUUFBUSxFQUFFO29CQUNOLHFDQUFxQztpQkFDeEM7YUFDSjtZQUNELFNBQVMsRUFBRSxDQUFDO1lBQ1osSUFBSSxFQUFFO2dCQUNGO29CQUNJLEVBQUUsRUFBRSxLQUFLO29CQUNULElBQUksRUFBRSxDQUFPLE9BQWlCLEVBQUcsR0FBWSxFQUFFLEVBQUU7d0JBQzdDLGFBQWE7d0JBQ2IsT0FBTyxNQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQWlCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBRSxDQUFDLEdBQUcsQ0FBQyxFQUFHLElBQUksQ0FBQzs2QkFDNUcsS0FBSyxDQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QixDQUFDLENBQUE7b0JBQ0QsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxDQUFDLEdBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSwrQkFBK0I7d0JBQ3RFLEtBQUssRUFBRSxDQUFDLEdBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSx3SEFBd0g7cUJBQ2xLO2lCQUNKO2FBQ0o7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksSUFBSSxDQUFDLFFBQWlCLEVBQUUsRUFBRSxHQUFHLEVBQW1COztZQUN6RCxNQUFNLFlBQVksR0FBMEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFTLENBQUMsQ0FBQztZQUNwRixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLGlDQUFlLENBQUMsR0FBRyxDQUFFLFlBQVksRUFBRyxHQUFHLENBQUUsQ0FBQTtZQUM3QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDVCxDQUFDO0tBQUE7Q0FDSjtBQXBDRCw4QkFvQ0M7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tYW5kfSBmcm9tIFwiZGlzY29yZC1ha2Fpcm9cIjtcbmltcG9ydCB7TWVzc2FnZSAsIFRleHRDaGFubmVsfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuXG5pbXBvcnQge1JlcG9zaXRvcnl9IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQge0dpdmVhd2F5c30gZnJvbSBcIi4uLy4uLy4uL0xpYi9EYXRhYmFzZS9Nb2RlbHMvR2l2ZWF3YXlzXCI7XG5pbXBvcnQge0dpdmVhd2F5TWFuYWdlcn0gZnJvbSBcIi4uLy4uLy4uL0xpYi9TdHJ1Y3R1cmVzL0dpdmVhd2F5TWFuYWdlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpdmVhd2F5RW5kIGV4dGVuZHMgQ29tbWFuZCB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcImdpdmVhd2F5LWVuZFwiLCB7XG4gICAgICAgICAgICBhbGlhc2VzOiBbXCJnZW5cIiwgXCJlbmQtZ2l2ZWF3YXlcIl0sXG4gICAgICAgICAgICBjYXRlZ29yeTogXCJVdGlsaXR5XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiRWRpdHMgYSBHaXZlYXdheVwiLFxuICAgICAgICAgICAgICAgIHVzYWdlOiBcIjw8Z2UgWyBtc2cgSUQgXSBbIHRpbWUgXSBbIHByaXplIF1cIixcbiAgICAgICAgICAgICAgICBleGFtcGxlczogW1xuICAgICAgICAgICAgICAgICAgICBcIjw8Z2MgNTMxNTMxMjM0NTQ1NDEwbSBEaXNjb3JkIE5pdHJvXCJcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmF0ZWxpbWl0OiAzLFxuICAgICAgICAgICAgYXJnczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibXNnXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGFzeW5jIChtZXNzYWdlIDogTWVzc2FnZSAsIHN0ciA6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IChtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmdldCAobWVzc2FnZS5jaGFubmVsLmlkKSBhcyBUZXh0Q2hhbm5lbCkubWVzc2FnZXMuZmV0Y2ggKChzdHIpICwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2ggKCgpID0+IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9tcHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAobXNnIDogTWVzc2FnZSkgPT4gYCR7bXNnLmF1dGhvcn0sIHlvdSBtdXN0IHByb3ZpZGUgYSBtZXNzYWdlIWAgLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnk6IChtc2cgOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSwgeW91IG11c3QgcHJvdmlkZSBhIHZhbGlkIG1lc3NhZ2UhKEhpbnQ6IFRoaXMgY29tbWFuZCBzaG91bGQgYmUgdXNlZCBpbiB0aGUgY2hhbm5lbCBpbiB3aGljaCB0aGUgZ2l2ZWF3YXkgaXMgcHJlc2VudClgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjKF9tZXNzYWdlOiBNZXNzYWdlLCB7IG1zZyB9OiB7IG1zZzogTWVzc2FnZX0pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBnaXZlYXdheVJlcG86IFJlcG9zaXRvcnk8R2l2ZWF3YXlzPiA9IHRoaXMuY2xpZW50LmRiLmdldFJlcG9zaXRvcnkoR2l2ZWF3YXlzKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBHaXZlYXdheU1hbmFnZXIuZW5kKCBnaXZlYXdheVJlcG8gLCBtc2cgKVxuICAgICAgICB9LCAxKVxuICAgIH1cbn07Il19