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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const ms_1 = __importDefault(require("ms"));
const Giveaways_1 = require("../../../Lib/Database/Models/Giveaways");
const GiveawayManager_1 = require("../../../Lib/Structures/GiveawayManager");
class GiveawayEnd extends discord_akairo_1.Command {
    constructor() {
        super("giveaway-edit", {
            aliases: ["ge", "edit-giveaway"],
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
                },
                {
                    id: "time",
                    type: (msg, str) => {
                        return (str ? Number(ms_1.default(str)) : null);
                    },
                    prompt: {
                        start: (msg) => `${msg.author}, you must provide a time!`,
                        retry: (msg) => `${msg.author}, you must provide a valid time!`
                    }
                },
                {
                    id: "item",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: (msg) => `${msg.author}. you must provide a item to give away.`
                    }
                }
            ]
        });
    }
    exec(message, { time, item, msg }) {
        return __awaiter(this, void 0, void 0, function* () {
            const giveawayRepo = this.client.db.getRepository(Giveaways_1.Giveaways);
            const end = Date.now() + time;
            yield GiveawayManager_1.GiveawayManager.edit(end, time, item, giveawayRepo, msg);
        });
    }
}
exports.default = GiveawayEnd;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2l2ZWF3YXlFZGl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vU3JjL0JvdC9Db21tYW5kcy9HaXZlYXdheXMvR2l2ZWF3YXlFZGl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXVDO0FBRXZDLDRDQUFvQjtBQUdwQixzRUFBaUU7QUFDakUsNkVBQXVFO0FBRXZFLE1BQXFCLFdBQVksU0FBUSx3QkFBTztJQUM1QztRQUNJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDbkIsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQztZQUNoQyxRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLGtCQUFrQjtnQkFDM0IsS0FBSyxFQUFFLG9DQUFvQztnQkFDM0MsUUFBUSxFQUFFO29CQUNOLHFDQUFxQztpQkFDeEM7YUFDSjtZQUNELFNBQVMsRUFBRSxDQUFDO1lBQ1osSUFBSSxFQUFFO2dCQUNGO29CQUNJLEVBQUUsRUFBRSxLQUFLO29CQUNULElBQUksRUFBRSxDQUFPLE9BQWlCLEVBQUcsR0FBWSxFQUFFLEVBQUU7d0JBQ3pDLGFBQWE7d0JBQ2pCLE9BQU8sTUFBTyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFrQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRyxJQUFJLENBQUU7NkJBQzVHLEtBQUssQ0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUUsQ0FBQztvQkFDbEMsQ0FBQyxDQUFBO29CQUNELE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsQ0FBQyxHQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sK0JBQStCO3dCQUN0RSxLQUFLLEVBQUUsQ0FBQyxHQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sd0hBQXdIO3FCQUNsSztpQkFDSjtnQkFDRDtvQkFDSSxFQUFFLEVBQUUsTUFBTTtvQkFDVixJQUFJLEVBQUUsQ0FBQyxHQUFhLEVBQUcsR0FBWSxFQUFFLEVBQUU7d0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBRSxZQUFFLENBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVDLENBQUM7b0JBQ0QsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxDQUFDLEdBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSw0QkFBNEI7d0JBQ25FLEtBQUssRUFBRSxDQUFDLEdBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxrQ0FBa0M7cUJBQzVFO2lCQUNKO2dCQUNEO29CQUNJLEVBQUUsRUFBRSxNQUFNO29CQUNWLElBQUksRUFBRSxRQUFRO29CQUNkLEtBQUssRUFBRSxNQUFNO29CQUNiLE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsQ0FBQyxHQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0seUNBQXlDO3FCQUNsRjtpQkFDSjthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVZLElBQUksQ0FBQyxPQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQStDOztZQUNoRyxNQUFNLFlBQVksR0FBMEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFTLENBQUMsQ0FBQztZQUNwRixNQUFNLEdBQUcsR0FBVyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLE1BQU0saUNBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ2xFLENBQUM7S0FBQTtDQUNKO0FBckRELDhCQXFEQztBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1hbmR9IGZyb20gXCJkaXNjb3JkLWFrYWlyb1wiO1xuaW1wb3J0IHtNZXNzYWdlICwgVGV4dENoYW5uZWx9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgbXMgZnJvbSBcIm1zXCI7XG5cbmltcG9ydCB7UmVwb3NpdG9yeX0gZnJvbSBcInR5cGVvcm1cIjtcbmltcG9ydCB7R2l2ZWF3YXlzfSBmcm9tIFwiLi4vLi4vLi4vTGliL0RhdGFiYXNlL01vZGVscy9HaXZlYXdheXNcIjtcbmltcG9ydCB7R2l2ZWF3YXlNYW5hZ2VyfSBmcm9tIFwiLi4vLi4vLi4vTGliL1N0cnVjdHVyZXMvR2l2ZWF3YXlNYW5hZ2VyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2l2ZWF3YXlFbmQgZXh0ZW5kcyBDb21tYW5kIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiZ2l2ZWF3YXktZWRpdFwiLCB7XG4gICAgICAgICAgICBhbGlhc2VzOiBbXCJnZVwiLCBcImVkaXQtZ2l2ZWF3YXlcIl0sXG4gICAgICAgICAgICBjYXRlZ29yeTogXCJVdGlsaXR5XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiRWRpdHMgYSBHaXZlYXdheVwiLFxuICAgICAgICAgICAgICAgIHVzYWdlOiBcIjw8Z2UgWyBtc2cgSUQgXSBbIHRpbWUgXSBbIHByaXplIF1cIixcbiAgICAgICAgICAgICAgICBleGFtcGxlczogW1xuICAgICAgICAgICAgICAgICAgICBcIjw8Z2MgNTMxNTMxMjM0NTQ1NDEwbSBEaXNjb3JkIE5pdHJvXCJcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmF0ZWxpbWl0OiAzLFxuICAgICAgICAgICAgYXJnczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibXNnXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGFzeW5jIChtZXNzYWdlIDogTWVzc2FnZSAsIHN0ciA6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCAobWVzc2FnZS5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQgKCBtZXNzYWdlLmNoYW5uZWwuaWQgKSBhcyBUZXh0Q2hhbm5lbCkubWVzc2FnZXMuZmV0Y2ggKCAoc3RyKSAsIHRydWUgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2ggKCAoKSA9PiBudWxsICk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHByb21wdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IChtc2cgOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSwgeW91IG11c3QgcHJvdmlkZSBhIG1lc3NhZ2UhYCAsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeTogKG1zZyA6IE1lc3NhZ2UpID0+IGAke21zZy5hdXRob3J9LCB5b3UgbXVzdCBwcm92aWRlIGEgdmFsaWQgbWVzc2FnZSEoSGludDogVGhpcyBjb21tYW5kIHNob3VsZCBiZSB1c2VkIGluIHRoZSBjaGFubmVsIGluIHdoaWNoIHRoZSBnaXZlYXdheSBpcyBwcmVzZW50KWBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aW1lXCIgLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAobXNnIDogTWVzc2FnZSAsIHN0ciA6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChzdHIgPyBOdW1iZXIgKG1zIChzdHIpKSA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9ICxcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogKG1zZyA6IE1lc3NhZ2UpID0+IGAke21zZy5hdXRob3J9LCB5b3UgbXVzdCBwcm92aWRlIGEgdGltZSFgICxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5OiAobXNnIDogTWVzc2FnZSkgPT4gYCR7bXNnLmF1dGhvcn0sIHlvdSBtdXN0IHByb3ZpZGUgYSB2YWxpZCB0aW1lIWBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJpdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoOiBcInJlc3RcIixcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogKG1zZzogTWVzc2FnZSkgPT4gYCR7bXNnLmF1dGhvcn0uIHlvdSBtdXN0IHByb3ZpZGUgYSBpdGVtIHRvIGdpdmUgYXdheS5gXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjKG1lc3NhZ2U6IE1lc3NhZ2UsIHsgdGltZSwgaXRlbSwgbXNnIH06IHsgdGltZTogbnVtYmVyLCBpdGVtOiBzdHJpbmcsIG1zZzogTWVzc2FnZX0pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBnaXZlYXdheVJlcG86IFJlcG9zaXRvcnk8R2l2ZWF3YXlzPiA9IHRoaXMuY2xpZW50LmRiLmdldFJlcG9zaXRvcnkoR2l2ZWF3YXlzKTtcbiAgICAgICAgY29uc3QgZW5kOiBudW1iZXIgPSBEYXRlLm5vdygpICsgdGltZTtcbiAgICAgICAgYXdhaXQgR2l2ZWF3YXlNYW5hZ2VyLmVkaXQoZW5kLCB0aW1lLCBpdGVtLCBnaXZlYXdheVJlcG8sIG1zZylcbiAgICB9XG59OyJdfQ==