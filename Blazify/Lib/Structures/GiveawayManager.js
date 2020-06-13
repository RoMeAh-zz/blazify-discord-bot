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
exports.GiveawayManager = void 0;
const discord_js_1 = require("discord.js");
class GiveawayManager {
}
exports.GiveawayManager = GiveawayManager;
GiveawayManager.start = function (end, time, item, giveawayRepo, message) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const msg = yield message.util.send(new discord_js_1.MessageEmbed()
            .setAuthor(`Giveaway | Ends at ${end}`)
            .setColor("RANDOM")
            .setTitle(`\`${item}\` is been given away!`)
            .setDescription(`${message.author} is giving away **${item}!**`)
            .setFooter("Giveaway Ends")
            .setTimestamp(end));
        yield msg.react("🎉");
        yield giveawayRepo.insert({
            channel: msg.channel.id,
            message: msg.id,
            end: end,
            time: time,
        });
        let fetchedRepo = yield giveawayRepo.findOne({ message: msg.id });
        // @ts-ignore
        let fetchedTime = fetchedRepo.time;
        if (!msg)
            return;
        setTimeout(() => {
            GiveawayManager.end(giveawayRepo, msg);
        }, fetchedTime);
    });
};
GiveawayManager.edit = function (end, time, item, giveawayRepo, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let fetchedRepo = yield giveawayRepo.findOne({ message: msg.id });
        // @ts-ignore
        fetchedRepo.end = end;
        // @ts-ignore
        yield giveawayRepo.save(fetchedRepo);
        const embed = msg.embeds[0];
        embed.setAuthor(`Giveaway | Ends at ${end}`);
        embed.setColor("RANDOM");
        embed.setTitle(`\`${item}\` is been given away!`);
        embed.setDescription(`${msg.author} is giving away **${item}!**`);
        embed.setFooter("Giveaway Ends");
        embed.setTimestamp(end);
        yield msg.edit(embed);
        yield msg.channel.send("Giveaway Edited Successfully");
    });
};
GiveawayManager.reroll = function (giveawayRepo, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        yield msg.fetch();
        let result = yield giveawayRepo.findOne({ message: msg.id });
        if (result) {
            msg.channel.send("The giveaway hasn't end yet");
        }
        else {
            // @ts-ignore
            const reaction = yield msg.reactions.cache.filter(r => r.emoji.name === "🎉").first().fetch();
            yield reaction.users.fetch();
            const winner = reaction.users.cache.filter(w => !w.bot).random();
            msg.channel.send(`${winner} has won the giveaway`);
        }
    });
};
GiveawayManager.end = function (giveawayRepo, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!msg)
            return;
        yield giveawayRepo.delete({ message: msg.id });
        // @ts-ignore
        const reaction = yield msg.reactions.cache.filter(r => r.emoji.name === "🎉").first().fetch();
        yield reaction.users.fetch();
        const winner = reaction.users.cache.filter(w => !w.bot).random();
        const embed = msg.embeds[0];
        embed.setFooter("Giveaway Ended");
        embed.setColor("RANDOM");
        embed.addField("Winner:", winner ? `${winner} (${winner.tag})` : "No Winners");
        yield msg.edit(embed);
        if (!winner)
            return;
        yield winner.send(`You won a giveaway!! Link to the Giveaway: ${msg.url}`);
    });
};
GiveawayManager.delete = function (giveawayRepo, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        yield giveawayRepo.delete({ message: msg.id });
        yield msg.delete();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2l2ZWF3YXlNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vU3JjL0xpYi9TdHJ1Y3R1cmVzL0dpdmVhd2F5TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBb0c7QUFLcEcsTUFBYSxlQUFlOztBQUE1QiwwQ0FvRkM7QUFuRlUscUJBQUssR0FBSSxVQUFnQixHQUFZLEVBQUcsSUFBYSxFQUFHLElBQWEsRUFBRSxZQUFvQyxFQUFHLE9BQWlCOztRQUNsSSxhQUFhO1FBQ2IsTUFBTSxHQUFHLEdBQVksTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFZLEVBQUU7YUFDMUQsU0FBUyxDQUFDLHNCQUFzQixHQUFHLEVBQUUsQ0FBQzthQUN0QyxRQUFRLENBQUMsUUFBUSxDQUFDO2FBQ2xCLFFBQVEsQ0FBQyxLQUFLLElBQUksd0JBQXdCLENBQUM7YUFDM0MsY0FBYyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0scUJBQXFCLElBQUksS0FBSyxDQUFDO2FBQy9ELFNBQVMsQ0FBQyxlQUFlLENBQUM7YUFDMUIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUNyQixDQUFBO1FBQ0QsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sWUFBWSxDQUFDLE1BQU0sQ0FBRTtZQUN2QixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNmLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7UUFDSCxJQUFJLFdBQVcsR0FBRyxNQUFNLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUE7UUFDaEUsYUFBYTtRQUNiLElBQUksV0FBVyxHQUFJLFdBQVcs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b250ZW50IjpbImltcG9ydCB7Q29sbGVjdGlvbiAsIE1lc3NhZ2UgLCBNZXNzYWdlRW1iZWQgLCBNZXNzYWdlUmVhY3Rpb24gLCBTbm93Zmxha2UgLCBVc2VyfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQgeyBHaXZlYXdheXMgfSBmcm9tIFwiLi4vRGF0YWJhc2UvTW9kZWxzL0dpdmVhd2F5c1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBHaXZlYXdheU1hbmFnZXIge1xuICAgIHN0YXRpYyBzdGFydCA9ICBhc3luYyBmdW5jdGlvbiAoZW5kIDogbnVtYmVyICwgdGltZSA6IG51bWJlciAsIGl0ZW0gOiBzdHJpbmcsIGdpdmVhd2F5UmVwbyA6IFJlcG9zaXRvcnk8R2l2ZWF3YXlzPiAsIG1lc3NhZ2UgOiBNZXNzYWdlKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgbXNnOiBNZXNzYWdlID0gYXdhaXQgbWVzc2FnZS51dGlsLnNlbmQobmV3IE1lc3NhZ2VFbWJlZCgpXG4gICAgICAgICAgICAuc2V0QXV0aG9yKGBHaXZlYXdheSB8IEVuZHMgYXQgJHtlbmR9YClcbiAgICAgICAgICAgIC5zZXRDb2xvcihcIlJBTkRPTVwiKVxuICAgICAgICAgICAgLnNldFRpdGxlKGBcXGAke2l0ZW19XFxgIGlzIGJlZW4gZ2l2ZW4gYXdheSFgKVxuICAgICAgICAgICAgLnNldERlc2NyaXB0aW9uKGAke21lc3NhZ2UuYXV0aG9yfSBpcyBnaXZpbmcgYXdheSAqKiR7aXRlbX0hKipgKVxuICAgICAgICAgICAgLnNldEZvb3RlcihcIkdpdmVhd2F5IEVuZHNcIilcbiAgICAgICAgICAgIC5zZXRUaW1lc3RhbXAoZW5kKVxuICAgICAgICApXG4gICAgICAgIGF3YWl0IG1zZy5yZWFjdChcIvCfjolcIik7XG4gICAgICAgIGF3YWl0IGdpdmVhd2F5UmVwby5pbnNlcnQgKHtcbiAgICAgICAgICAgIGNoYW5uZWw6IG1zZy5jaGFubmVsLmlkICxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZy5pZCAsXG4gICAgICAgICAgICBlbmQ6IGVuZCxcbiAgICAgICAgICAgIHRpbWU6IHRpbWUsXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgZmV0Y2hlZFJlcG8gPSBhd2FpdCBnaXZlYXdheVJlcG8uZmluZE9uZSh7IG1lc3NhZ2U6IG1zZy5pZH0pXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbGV0IGZldGNoZWRUaW1lID0gIGZldGNoZWRSZXBvLnRpbWU7XG4gICAgICAgIGlmICghbXNnKSByZXR1cm47XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgR2l2ZWF3YXlNYW5hZ2VyLmVuZCggZ2l2ZWF3YXlSZXBvICwgbXNnIClcbiAgICAgICAgfSwgZmV0Y2hlZFRpbWUpO1xuICAgIH1cbiAgICBzdGF0aWMgZWRpdCA9IGFzeW5jIGZ1bmN0aW9uIChlbmQgOiBudW1iZXIgLCB0aW1lIDogbnVtYmVyICwgaXRlbSA6IHN0cmluZyAsIGdpdmVhd2F5UmVwbyA6IFJlcG9zaXRvcnk8R2l2ZWF3YXlzPiAsIG1zZyA6IE1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IGZldGNoZWRSZXBvID0gYXdhaXQgZ2l2ZWF3YXlSZXBvLmZpbmRPbmUgKHttZXNzYWdlOiBtc2cuaWR9KVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGZldGNoZWRSZXBvLmVuZCA9IGVuZDtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhd2FpdCBnaXZlYXdheVJlcG8uc2F2ZShmZXRjaGVkUmVwbyk7XG4gICAgICAgIGNvbnN0IGVtYmVkOiBNZXNzYWdlRW1iZWQgPSBtc2cuZW1iZWRzWzBdO1xuICAgICAgICAgIGVtYmVkLnNldEF1dGhvcihgR2l2ZWF3YXkgfCBFbmRzIGF0ICR7ZW5kfWApXG4gICAgICAgICAgZW1iZWQuc2V0Q29sb3IoXCJSQU5ET01cIilcbiAgICAgICAgICBlbWJlZC5zZXRUaXRsZShgXFxgJHtpdGVtfVxcYCBpcyBiZWVuIGdpdmVuIGF3YXkhYClcbiAgICAgICAgICBlbWJlZC5zZXREZXNjcmlwdGlvbihgJHttc2cuYXV0aG9yfSBpcyBnaXZpbmcgYXdheSAqKiR7aXRlbX0hKipgKVxuICAgICAgICAgIGVtYmVkLnNldEZvb3RlcihcIkdpdmVhd2F5IEVuZHNcIilcbiAgICAgICAgICBlbWJlZC5zZXRUaW1lc3RhbXAoZW5kKVxuXG4gICAgICAgIGF3YWl0IG1zZy5lZGl0IChlbWJlZClcblxuICAgICAgICBhd2FpdCBtc2cuY2hhbm5lbC5zZW5kKFwiR2l2ZWF3YXkgRWRpdGVkIFN1Y2Nlc3NmdWxseVwiKVxuXG4gICAgfVxuICAgIHN0YXRpYyByZXJvbGwgPSBhc3luYyBmdW5jdGlvbihnaXZlYXdheVJlcG86IFJlcG9zaXRvcnk8R2l2ZWF3YXlzPiwgbXNnOiBNZXNzYWdlKSB7XG4gICAgICAgIGF3YWl0IG1zZy5mZXRjaCgpXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IGdpdmVhd2F5UmVwby5maW5kT25lKHsgbWVzc2FnZTogbXNnLmlkIH0pXG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIG1zZy5jaGFubmVsLnNlbmQgKCBcIlRoZSBnaXZlYXdheSBoYXNuJ3QgZW5kIHlldFwiIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbnN0IHJlYWN0aW9uOiBNZXNzYWdlUmVhY3Rpb24gPSBhd2FpdCBtc2cucmVhY3Rpb25zLmNhY2hlLmZpbHRlcihyID0+IHIuZW1vamkubmFtZSA9PT0gXCLwn46JXCIpLmZpcnN0KCkuZmV0Y2goKTtcbiAgICAgICAgICAgIGF3YWl0IHJlYWN0aW9uLnVzZXJzLmZldGNoICgpO1xuICAgICAgICAgICAgY29uc3Qgd2lubmVyIDogVXNlciA9IHJlYWN0aW9uLnVzZXJzLmNhY2hlLmZpbHRlciAoIHcgPT4gISB3LmJvdCApLnJhbmRvbSAoKTtcblxuICAgICAgICAgICAgbXNnLmNoYW5uZWwuc2VuZCAoIGAke3dpbm5lcn0gaGFzIHdvbiB0aGUgZ2l2ZWF3YXlgIClcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZW5kID0gYXN5bmMgZnVuY3Rpb24gKGdpdmVhd2F5UmVwbyA6IFJlcG9zaXRvcnk8R2l2ZWF3YXlzPiAsIG1zZyA6IE1lc3NhZ2UpIHtcblxuICAgICAgICBpZighbXNnKSByZXR1cm4gO1xuICAgICAgICBhd2FpdCBnaXZlYXdheVJlcG8uZGVsZXRlICh7bWVzc2FnZTogbXNnLmlkfSk7XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCByZWFjdGlvbjogTWVzc2FnZVJlYWN0aW9uID0gYXdhaXQgbXNnLnJlYWN0aW9ucy5jYWNoZS5maWx0ZXIociA9PiByLmVtb2ppLm5hbWUgPT09IFwi8J+OiVwiKS5maXJzdCgpLmZldGNoKCk7XG4gICAgICAgIGF3YWl0IHJlYWN0aW9uLnVzZXJzLmZldGNoKCk7XG4gICAgICAgIGNvbnN0IHdpbm5lcjogVXNlciA9IHJlYWN0aW9uLnVzZXJzLmNhY2hlLmZpbHRlcih3ID0+ICF3LmJvdCApLnJhbmRvbSgpO1xuXG4gICAgICAgIGNvbnN0IGVtYmVkOiBNZXNzYWdlRW1iZWQgPSBtc2chLmVtYmVkcyFbMF07XG4gICAgICAgIGVtYmVkLnNldEZvb3RlcihcIkdpdmVhd2F5IEVuZGVkXCIpO1xuICAgICAgICBlbWJlZC5zZXRDb2xvcihcIlJBTkRPTVwiKTtcbiAgICAgICAgZW1iZWQuYWRkRmllbGQoXCJXaW5uZXI6XCIsIHdpbm5lciA/IGAke3dpbm5lcn0gKCR7d2lubmVyLnRhZ30pYCA6IFwiTm8gV2lubmVyc1wiKTtcbiAgICAgICAgYXdhaXQgbXNnIS5lZGl0IShlbWJlZCk7XG5cbiAgICAgICAgaWYoIXdpbm5lcikgcmV0dXJuO1xuXG4gICAgICAgIGF3YWl0IHdpbm5lci5zZW5kKGBZb3Ugd29uIGEgZ2l2ZWF3YXkhISBMaW5rIHRvIHRoZSBHaXZlYXdheTogJHttc2cudXJsfWApXG4gICAgfVxuICAgIHN0YXRpYyBkZWxldGUgPSBhc3luYyBmdW5jdGlvbihnaXZlYXdheVJlcG86IFJlcG9zaXRvcnk8R2l2ZWF3YXlzPiwgbXNnOiBNZXNzYWdlKSB7XG4gICAgICAgIGF3YWl0IGdpdmVhd2F5UmVwby5kZWxldGUoe21lc3NhZ2U6IG1zZy5pZH0pXG5cbiAgICAgICAgYXdhaXQgbXNnLmRlbGV0ZSAoKVxuICAgIH1cbn0iXX0=