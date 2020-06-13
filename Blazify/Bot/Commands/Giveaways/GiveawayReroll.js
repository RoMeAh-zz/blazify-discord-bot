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
class GiveawayReroll extends discord_akairo_1.Command {
    constructor() {
        super("giveaway-reroll", {
            aliases: ["gr", "reroll-giveaway"],
            category: "Utility",
            description: {
                content: "Rerolls a Giveaway",
                usage: "<<gr [ msg id ]",
                examples: [
                    "<<gr 516666871471971761171"
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
            yield GiveawayManager_1.GiveawayManager.reroll(giveawayRepo, msg);
        });
    }
}
exports.default = GiveawayReroll;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2l2ZWF3YXlSZXJvbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9TcmMvQm90L0NvbW1hbmRzL0dpdmVhd2F5cy9HaXZlYXdheVJlcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1EQUF1QztBQUl2QyxzRUFBaUU7QUFDakUsNkVBQXVFO0FBRXZFLE1BQXFCLGNBQWUsU0FBUSx3QkFBTztJQUMvQztRQUNJLEtBQUssQ0FBRSxpQkFBaUIsRUFBRztZQUN2QixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUcsaUJBQWlCLENBQUM7WUFDbkMsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFO2dCQUNULE9BQU8sRUFBRSxvQkFBb0I7Z0JBQzdCLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLFFBQVEsRUFBRTtvQkFDTiw0QkFBNEI7aUJBQy9CO2FBQ0o7WUFDRCxTQUFTLEVBQUUsQ0FBQztZQUNaLElBQUksRUFBRTtnQkFDRjtvQkFDSSxFQUFFLEVBQUUsS0FBSztvQkFDVCxJQUFJLEVBQUUsQ0FBTyxPQUFpQixFQUFHLEdBQVksRUFBRSxFQUFFO3dCQUM3QyxhQUFhO3dCQUNiLE9BQU8sTUFBTyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRyxJQUFJLENBQUM7NkJBQzVHLEtBQUssQ0FBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUIsQ0FBQyxDQUFBO29CQUNELE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsQ0FBQyxHQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sK0JBQStCO3dCQUN0RSxLQUFLLEVBQUUsQ0FBQyxHQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sd0hBQXdIO3FCQUNsSztpQkFDSjthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVZLElBQUksQ0FBQyxRQUFrQixFQUFHLEVBQUMsR0FBRyxFQUFxQjs7WUFDNUQsTUFBTSxZQUFZLEdBQTJCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBRSxxQkFBUyxDQUFDLENBQUM7WUFDbEYsTUFBTSxpQ0FBZSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUcsR0FBRyxDQUFDLENBQUE7UUFDeEQsQ0FBQztLQUFBO0NBQ0o7QUFsQ0QsaUNBa0NDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbWFuZH0gZnJvbSBcImRpc2NvcmQtYWthaXJvXCI7XG5pbXBvcnQge01lc3NhZ2UgLCBUZXh0Q2hhbm5lbH0gZnJvbSBcImRpc2NvcmQuanNcIjtcblxuaW1wb3J0IHtSZXBvc2l0b3J5fSBmcm9tIFwidHlwZW9ybVwiO1xuaW1wb3J0IHtHaXZlYXdheXN9IGZyb20gXCIuLi8uLi8uLi9MaWIvRGF0YWJhc2UvTW9kZWxzL0dpdmVhd2F5c1wiO1xuaW1wb3J0IHtHaXZlYXdheU1hbmFnZXJ9IGZyb20gXCIuLi8uLi8uLi9MaWIvU3RydWN0dXJlcy9HaXZlYXdheU1hbmFnZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHaXZlYXdheVJlcm9sbCBleHRlbmRzIENvbW1hbmR7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciAoXCJnaXZlYXdheS1yZXJvbGxcIiAsIHtcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcImdyXCIgLCBcInJlcm9sbC1naXZlYXdheVwiXSAsXG4gICAgICAgICAgICBjYXRlZ29yeTogXCJVdGlsaXR5XCIgLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlJlcm9sbHMgYSBHaXZlYXdheVwiICxcbiAgICAgICAgICAgICAgICB1c2FnZTogXCI8PGdyIFsgbXNnIGlkIF1cIiAsXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgXCI8PGdyIDUxNjY2Njg3MTQ3MTk3MTc2MTE3MVwiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSAsXG4gICAgICAgICAgICByYXRlbGltaXQ6IDMgLFxuICAgICAgICAgICAgYXJnczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibXNnXCIgLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBhc3luYyAobWVzc2FnZSA6IE1lc3NhZ2UgLCBzdHIgOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCAobWVzc2FnZS5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQgKG1lc3NhZ2UuY2hhbm5lbC5pZCkgYXMgVGV4dENoYW5uZWwpLm1lc3NhZ2VzLmZldGNoICgoc3RyKSAsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoICgoKSA9PiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSAsXG4gICAgICAgICAgICAgICAgICAgIHByb21wdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IChtc2cgOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSwgeW91IG11c3QgcHJvdmlkZSBhIG1lc3NhZ2UhYCAsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeTogKG1zZyA6IE1lc3NhZ2UpID0+IGAke21zZy5hdXRob3J9LCB5b3UgbXVzdCBwcm92aWRlIGEgdmFsaWQgbWVzc2FnZSEoSGludDogVGhpcyBjb21tYW5kIHNob3VsZCBiZSB1c2VkIGluIHRoZSBjaGFubmVsIGluIHdoaWNoIHRoZSBnaXZlYXdheSBpcyBwcmVzZW50KWBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4ZWMoX21lc3NhZ2UgOiBNZXNzYWdlICwge21zZ30gOiB7IG1zZyA6IE1lc3NhZ2UgfSkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBnaXZlYXdheVJlcG8gOiBSZXBvc2l0b3J5PEdpdmVhd2F5cz4gPSB0aGlzLmNsaWVudC5kYi5nZXRSZXBvc2l0b3J5IChHaXZlYXdheXMpO1xuICAgICAgICAgICAgYXdhaXQgR2l2ZWF3YXlNYW5hZ2VyLnJlcm9sbChnaXZlYXdheVJlcG8gLCBtc2cpXG4gICAgfVxufTsiXX0=