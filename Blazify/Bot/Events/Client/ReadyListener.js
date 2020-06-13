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
const lavajs_1 = require("@anonymousg/lavajs");
const GiveawayManager_1 = require("../../../Lib/Structures/GiveawayManager");
const Config_1 = require("../../../Config");
const YouTubeVideoNotifier_1 = require("../../../Lib/Structures/YouTubeVideoNotifier");
class ReadyListener extends discord_akairo_1.Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            const nodes = [
                {
                    host: "localhost",
                    port: 2333,
                    password: "youshallnotpass"
                }
            ];
            // @ts-ignore
            this.client.music = new lavajs_1.LavaClient(this.client, nodes, 0);
            const giveawayRepo = this.client.db.getRepository(Giveaways_1.Giveaways);
            console.log(`${this.client.user.tag} is online and ready`);
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const giveaways = yield giveawayRepo.find();
                giveaways.filter(g => g.end <= Date.now()).map((g) => __awaiter(this, void 0, void 0, function* () {
                    // @ts-ignore
                    const msg = yield this.client.channels.cache.get(g.channel).messages.fetch()
                        .catch(() => null);
                    if (!msg)
                        return giveawayRepo.delete(g);
                    yield GiveawayManager_1.GiveawayManager.end(giveawayRepo, msg);
                }));
            }), 3e5);
            YouTubeVideoNotifier_1.handleUploads(this.client, Config_1.channel_id, Config_1.discord_channel, Config_1.ytwatchInterval, Config_1.messageTemplate);
        });
    }
}
exports.default = ReadyListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZHlMaXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NyYy9Cb3QvRXZlbnRzL0NsaWVudC9SZWFkeUxpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbURBQTBDO0FBRzFDLHNFQUFtRTtBQUVuRSwrQ0FBZ0Q7QUFFaEQsNkVBQTRFO0FBQzVFLDRDQUFnRztBQUNoRyx1RkFBNEU7QUFDNUUsTUFBcUIsYUFBYyxTQUFRLHlCQUFRO0lBQy9DO1FBQ0ksS0FBSyxDQUFFLE9BQU8sRUFBRztZQUNiLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLEtBQUssRUFBRSxPQUFPO1lBQ2QsUUFBUSxFQUFFLFFBQVE7U0FDckIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVZLElBQUk7O1lBQ2IsTUFBTSxLQUFLLEdBQUc7Z0JBQ1Y7b0JBQ0ksSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxJQUFJO29CQUNWLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzlCO2FBQ0osQ0FBQTtZQUVBLGFBQWE7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLG1CQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFHekQsTUFBTSxZQUFZLEdBQTJCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBRSxxQkFBUyxDQUFDLENBQUM7WUFFdEYsT0FBTyxDQUFDLEdBQUcsQ0FBRSxHQUFHLElBQUssQ0FBQyxNQUFPLENBQUMsSUFBSyxDQUFDLEdBQUcsc0JBQXNCLENBQUMsQ0FBQztZQUUvRCxXQUFXLENBQUUsR0FBUyxFQUFFO2dCQUNwQixNQUFNLFNBQVMsR0FBaUIsTUFBTSxZQUFZLENBQUMsSUFBSSxFQUFHLENBQUM7Z0JBQzNELFNBQVMsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFNLENBQUMsRUFBQyxFQUFFO29CQUN4RCxhQUFhO29CQUNiLE1BQU0sR0FBRyxHQUFhLE1BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsT0FBTyxDQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUc7eUJBQ3BHLEtBQUssQ0FBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDeEIsSUFBSSxDQUFFLEdBQUc7d0JBQUUsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQyxDQUFDO29CQUMxQyxNQUFNLGlDQUFlLENBQUMsR0FBRyxDQUFFLFlBQVksRUFBRyxHQUFHLENBQUMsQ0FBQTtnQkFDbEQsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQSxFQUFHLEdBQUcsQ0FBQyxDQUFBO1lBQ1Isb0NBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLG1CQUFVLEVBQUUsd0JBQWUsRUFBRSx3QkFBZSxFQUFFLHdCQUFlLENBQUMsQ0FBQTtRQUM3RixDQUFDO0tBQUE7Q0FDSjtBQXRDRCxnQ0FzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0ZW5lciB9IGZyb20gXCJkaXNjb3JkLWFrYWlyb1wiO1xuaW1wb3J0IHsgVGV4dENoYW5uZWwsIE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQgeyBHaXZlYXdheXMgfSBmcm9tIFwiLi4vLi4vLi4vTGliL0RhdGFiYXNlL01vZGVscy9HaXZlYXdheXNcIjtcblxuaW1wb3J0IHsgTGF2YUNsaWVudCB9IGZyb20gXCJAYW5vbnltb3VzZy9sYXZhanNcIjtcblxuaW1wb3J0ICB7IEdpdmVhd2F5TWFuYWdlciB9ICBmcm9tIFwiLi4vLi4vLi4vTGliL1N0cnVjdHVyZXMvR2l2ZWF3YXlNYW5hZ2VyXCI7XG5pbXBvcnQgeyBjaGFubmVsX2lkLCBkaXNjb3JkX2NoYW5uZWwsIHl0d2F0Y2hJbnRlcnZhbCwgbWVzc2FnZVRlbXBsYXRlIH0gZnJvbSBcIi4uLy4uLy4uL0NvbmZpZ1wiO1xuaW1wb3J0IHsgaGFuZGxlVXBsb2FkcyB9IGZyb20gXCIuLi8uLi8uLi9MaWIvU3RydWN0dXJlcy9Zb3VUdWJlVmlkZW9Ob3RpZmllclwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFkeUxpc3RlbmVyIGV4dGVuZHMgTGlzdGVuZXIge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIgKFwicmVhZHlcIiAsIHtcbiAgICAgICAgICAgIGVtaXR0ZXI6IFwiY2xpZW50XCIgLFxuICAgICAgICAgICAgZXZlbnQ6IFwicmVhZHlcIiAsXG4gICAgICAgICAgICBjYXRlZ29yeTogXCJjbGllbnRcIlxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjKCkgOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaG9zdDogXCJsb2NhbGhvc3RcIixcbiAgICAgICAgICAgICAgICBwb3J0OiAyMzMzLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBcInlvdXNoYWxsbm90cGFzc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cblxuICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmNsaWVudC5tdXNpYyA9IG5ldyBMYXZhQ2xpZW50KHRoaXMuY2xpZW50LCBub2RlcywgMClcblxuXG4gICAgICAgIGNvbnN0IGdpdmVhd2F5UmVwbyA6IFJlcG9zaXRvcnk8R2l2ZWF3YXlzPiA9IHRoaXMuY2xpZW50LmRiLmdldFJlcG9zaXRvcnkgKEdpdmVhd2F5cyk7XG5cbiAgICAgICAgY29uc29sZS5sb2cgKGAke3RoaXMhLmNsaWVudCEudXNlciEudGFnfSBpcyBvbmxpbmUgYW5kIHJlYWR5YCk7XG5cbiAgICAgICAgc2V0SW50ZXJ2YWwgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdpdmVhd2F5cyA6IEdpdmVhd2F5c1tdID0gYXdhaXQgZ2l2ZWF3YXlSZXBvLmZpbmQgKCk7XG4gICAgICAgICAgICBnaXZlYXdheXMuZmlsdGVyIChnID0+IGcuZW5kIDw9IERhdGUubm93ICgpKS5tYXAgKGFzeW5jIGcgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjb25zdCBtc2cgOiBNZXNzYWdlID0gYXdhaXQgKHRoaXMuY2xpZW50LmNoYW5uZWxzLmNhY2hlLmdldCAoZy5jaGFubmVsKSBhcyBUZXh0Q2hhbm5lbCkubWVzc2FnZXMuZmV0Y2ggKClcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoICgoKSA9PiBudWxsKTtcbiAgICAgICAgICAgICAgICBpZiAoISBtc2cpIHJldHVybiBnaXZlYXdheVJlcG8uZGVsZXRlIChnKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBHaXZlYXdheU1hbmFnZXIuZW5kIChnaXZlYXdheVJlcG8gLCBtc2cpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSAsIDNlNSlcbiAgICAgICAgaGFuZGxlVXBsb2Fkcyh0aGlzLmNsaWVudCwgY2hhbm5lbF9pZCwgZGlzY29yZF9jaGFubmVsLCB5dHdhdGNoSW50ZXJ2YWwsIG1lc3NhZ2VUZW1wbGF0ZSlcbiAgICB9XG59Il19