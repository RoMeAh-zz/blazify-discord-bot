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
class GiveawayStart extends discord_akairo_1.Command {
    constructor() {
        super("giveaway-start", {
            aliases: ["gc", "start-giveaway"],
            category: "Utility",
            description: {
                content: "Starts a Giveaway",
                usage: "<<gc [ time ] [ prize ]",
                examples: [
                    "<<gc 10m Discord Nitro"
                ]
            },
            ratelimit: 3,
            args: [
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
    exec(message, { time, item }) {
        return __awaiter(this, void 0, void 0, function* () {
            const giveawayRepo = this.client.db.getRepository(Giveaways_1.Giveaways);
            const end = Date.now() + time;
            yield GiveawayManager_1.GiveawayManager.start(end, time, item, giveawayRepo, message);
        });
    }
}
exports.default = GiveawayStart;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2l2ZWF3YXlTdGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NyYy9Cb3QvQ29tbWFuZHMvR2l2ZWF3YXlzL0dpdmVhd2F5U3RhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBeUM7QUFFekMsNENBQW9CO0FBR3BCLHNFQUFtRTtBQUNuRSw2RUFBMEU7QUFFMUUsTUFBcUIsYUFBYyxTQUFRLHdCQUFPO0lBQzlDO1FBQ0ksS0FBSyxDQUFDLGdCQUFnQixFQUFFO1lBQ3BCLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQztZQUNqQyxRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLG1CQUFtQjtnQkFDNUIsS0FBSyxFQUFFLHlCQUF5QjtnQkFDaEMsUUFBUSxFQUFFO29CQUNOLHdCQUF3QjtpQkFDM0I7YUFDSjtZQUNELFNBQVMsRUFBRSxDQUFDO1lBQ1osSUFBSSxFQUFFO2dCQUNGO29CQUNJLEVBQUUsRUFBRSxNQUFNO29CQUNWLElBQUksRUFBRSxDQUFDLEdBQWEsRUFBRyxHQUFZLEVBQUUsRUFBRTt3QkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFFLFlBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUMsQ0FBQztvQkFDRCxNQUFNLEVBQUU7d0JBQ0osS0FBSyxFQUFFLENBQUMsR0FBYSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLDRCQUE0Qjt3QkFDbkUsS0FBSyxFQUFFLENBQUMsR0FBYSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLGtDQUFrQztxQkFDNUU7aUJBQ0o7Z0JBQ0Q7b0JBQ0ksRUFBRSxFQUFFLE1BQU07b0JBQ1YsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsS0FBSyxFQUFFLE1BQU07b0JBQ2IsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxDQUFDLEdBQVksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSx5Q0FBeUM7cUJBQ2xGO2lCQUNKO2FBQ0o7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksSUFBSSxDQUFDLE9BQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFtQzs7WUFDL0UsTUFBTSxZQUFZLEdBQTBCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLENBQUM7WUFDcEYsTUFBTSxHQUFHLEdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztZQUN0QyxNQUFNLGlDQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUN2RSxDQUFDO0tBQUE7Q0FDQTtBQXpDTCxnQ0F5Q0s7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCJkaXNjb3JkLWFrYWlyb1wiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgbXMgZnJvbSBcIm1zXCI7XG5cbmltcG9ydCB7IFJlcG9zaXRvcnkgfSBmcm9tIFwidHlwZW9ybVwiO1xuaW1wb3J0IHsgR2l2ZWF3YXlzIH0gZnJvbSBcIi4uLy4uLy4uL0xpYi9EYXRhYmFzZS9Nb2RlbHMvR2l2ZWF3YXlzXCI7XG5pbXBvcnQgeyBHaXZlYXdheU1hbmFnZXIgfSAgZnJvbSBcIi4uLy4uLy4uL0xpYi9TdHJ1Y3R1cmVzL0dpdmVhd2F5TWFuYWdlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpdmVhd2F5U3RhcnQgZXh0ZW5kcyBDb21tYW5kIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiZ2l2ZWF3YXktc3RhcnRcIiwge1xuICAgICAgICAgICAgYWxpYXNlczogW1wiZ2NcIiwgXCJzdGFydC1naXZlYXdheVwiXSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiBcIlV0aWxpdHlcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCJTdGFydHMgYSBHaXZlYXdheVwiLFxuICAgICAgICAgICAgICAgIHVzYWdlOiBcIjw8Z2MgWyB0aW1lIF0gWyBwcml6ZSBdXCIsXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgXCI8PGdjIDEwbSBEaXNjb3JkIE5pdHJvXCJcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmF0ZWxpbWl0OiAzLFxuICAgICAgICAgICAgYXJnczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGltZVwiICxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogKG1zZyA6IE1lc3NhZ2UgLCBzdHIgOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoc3RyID8gTnVtYmVyIChtcyAoc3RyKSkgOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSAsXG4gICAgICAgICAgICAgICAgICAgIHByb21wdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IChtc2cgOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSwgeW91IG11c3QgcHJvdmlkZSBhIHRpbWUhYCAsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeTogKG1zZyA6IE1lc3NhZ2UpID0+IGAke21zZy5hdXRob3J9LCB5b3UgbXVzdCBwcm92aWRlIGEgdmFsaWQgdGltZSFgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaDogXCJyZXN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHByb21wdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IChtc2c6IE1lc3NhZ2UpID0+IGAke21zZy5hdXRob3J9LiB5b3UgbXVzdCBwcm92aWRlIGEgaXRlbSB0byBnaXZlIGF3YXkuYFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZXhlYyhtZXNzYWdlOiBNZXNzYWdlLCB7IHRpbWUsIGl0ZW0gfTogeyB0aW1lOiBudW1iZXIgLCBpdGVtOiBzdHJpbmcgfSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IGdpdmVhd2F5UmVwbzogUmVwb3NpdG9yeTxHaXZlYXdheXM+ID0gdGhpcy5jbGllbnQuZGIuZ2V0UmVwb3NpdG9yeShHaXZlYXdheXMpO1xuICAgICAgICBjb25zdCBlbmQ6IG51bWJlciA9IERhdGUubm93KCkgKyB0aW1lO1xuICAgICAgICBhd2FpdCBHaXZlYXdheU1hbmFnZXIuc3RhcnQoZW5kLCB0aW1lLCBpdGVtLCBnaXZlYXdheVJlcG8sIG1lc3NhZ2UpXG4gICAgfVxuICAgIH07Il19