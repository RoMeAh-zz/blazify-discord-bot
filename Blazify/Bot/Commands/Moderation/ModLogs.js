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
const discord_js_1 = require("discord.js");
const Warns_1 = require("../../../Lib/Database/Models/Warns");
class ModLogs extends discord_akairo_1.Command {
    constructor() {
        super("modlogs", {
            aliases: ["modlogs", "userstrikes"],
            category: "Moderation",
            description: {
                content: "Check ModLogs of a User",
                usage: "modlogs [ member ]",
                examples: [
                    "modlogs Dumb"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    default: (msg) => msg.member
                }
            ]
        });
    }
    exec(message, { member }) {
        return __awaiter(this, void 0, void 0, function* () {
            const warnRepo = this.client.db.getRepository(Warns_1.Warns);
            // @ts-ignore
            const warns = yield warnRepo.find({ user: member.id, guild: message.guild.id });
            if (!warns.length) { // @ts-ignore
                // @ts-ignore
                return message.util.send("No Mod Logs found about this user");
            }
            const infractions = yield Promise.all(warns.map((v, i) => __awaiter(this, void 0, void 0, function* () {
                // @ts-ignore
                const mod = yield this.client.users.fetch(v.moderator).catch(() => null);
                if (mod)
                    return {
                        index: i + 1,
                        moderator: mod.tag,
                        reason: v.reason
                    };
            })));
            // @ts-ignore
            // @ts-ignore
            // @ts-ignore
            // @ts-ignore
            // @ts-ignore
            return message.util.send(new discord_js_1.MessageEmbed()
                .setAuthor(`ModLogs`, member.user.displayAvatarURL({ dynamic: true }))
                .setColor("#FF0000")
                //@ts-ignore
                .setDescription(infractions.map(v => `\`#${v.index}\` | Action: \`Warn\` Moderator: *${v.moderator}*\n Reason: *${v.reason}*\n `)));
        });
    }
}
exports.default = ModLogs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kTG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NyYy9Cb3QvQ29tbWFuZHMvTW9kZXJhdGlvbi9Nb2RMb2dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbURBQXlDO0FBQ3pDLDJDQUFzRTtBQUd0RSw4REFBMkQ7QUFFM0QsTUFBcUIsT0FBUSxTQUFRLHdCQUFPO0lBQ3hDO1FBQ0ksS0FBSyxDQUFFLFNBQVMsRUFBRztZQUNmLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRyxhQUFhLENBQUM7WUFDcEMsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFO2dCQUNULE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLEtBQUssRUFBRSxvQkFBb0I7Z0JBQzNCLFFBQVEsRUFBRTtvQkFDTixjQUFjO2lCQUNqQjthQUNKO1lBQ0QsU0FBUyxFQUFFLENBQUM7WUFDWixJQUFJLEVBQUU7Z0JBQ0Y7b0JBQ0ksRUFBRSxFQUFFLFFBQVE7b0JBQ1osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsT0FBTyxFQUFFLENBQUMsR0FBYSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTTtpQkFDekM7YUFDSjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDWSxJQUFJLENBQUMsT0FBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBMkI7O1lBQ25FLE1BQU0sUUFBUSxHQUFzQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBSyxDQUFDLENBQUE7WUFDdkUsYUFBYTtZQUNiLE1BQU0sS0FBSyxHQUFZLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFekYsSUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxhQUFhO2dCQUM3QixhQUFhO2dCQUNiLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQzthQUNqRTtZQUVELE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQVEsQ0FBUSxFQUFFLENBQVMsRUFBRSxFQUFFO2dCQUMzRSxhQUFhO2dCQUNiLE1BQU0sR0FBRyxHQUFTLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9FLElBQUcsR0FBRztvQkFBRSxPQUFPO3dCQUNYLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQzt3QkFDWixTQUFTLEVBQUUsR0FBRyxDQUFDLEdBQUc7d0JBQ2xCLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTTtxQkFDbkIsQ0FBQTtZQUNMLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUVKLGFBQWE7WUFDYixhQUFhO1lBQ2IsYUFBYTtZQUNiLGFBQWE7WUFDYixhQUFhO1lBQ2IsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFZLEVBQUU7aUJBQ3RDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUNuRSxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUNwQixZQUFZO2lCQUNYLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxxQ0FBcUMsQ0FBQyxDQUFDLFNBQVMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxDQUFDLENBQ3JJLENBQUE7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQXRERCwwQkFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcImRpc2NvcmQtYWthaXJvXCI7XG5pbXBvcnQgeyBNZXNzYWdlLCBHdWlsZE1lbWJlciwgVXNlciwgTWVzc2FnZUVtYmVkIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IFJlcG9zaXRvcnkgIH0gZnJvbSBcInR5cGVvcm1cIjtcblxuaW1wb3J0IHsgV2FybnMgfSBmcm9tIFwiLi4vLi4vLi4vTGliL0RhdGFiYXNlL01vZGVscy9XYXJuc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RMb2dzIGV4dGVuZHMgQ29tbWFuZCB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciAoXCJtb2Rsb2dzXCIgLCB7XG4gICAgICAgICAgICBhbGlhc2VzOiBbXCJtb2Rsb2dzXCIgLCBcInVzZXJzdHJpa2VzXCJdICxcbiAgICAgICAgICAgIGNhdGVnb3J5OiBcIk1vZGVyYXRpb25cIiAsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiQ2hlY2sgTW9kTG9ncyBvZiBhIFVzZXJcIiAsXG4gICAgICAgICAgICAgICAgdXNhZ2U6IFwibW9kbG9ncyBbIG1lbWJlciBdXCIgLFxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIFwibW9kbG9ncyBEdW1iXCJcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9ICxcbiAgICAgICAgICAgIHJhdGVsaW1pdDogMyAsXG4gICAgICAgICAgICBhcmdzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJtZW1iZXJcIiAsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibWVtYmVyXCIgLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiAobXNnIDogTWVzc2FnZSkgPT4gbXNnLm1lbWJlclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBhc3luYyBleGVjKG1lc3NhZ2U6IE1lc3NhZ2UsIHsgbWVtYmVyIH06IHsgbWVtYmVyOiBHdWlsZE1lbWJlciB9KTogUHJvbWlzZTxNZXNzYWdlPiB7XG4gICAgICAgIGNvbnN0IHdhcm5SZXBvOiBSZXBvc2l0b3J5PFdhcm5zPiA9IHRoaXMuY2xpZW50LmRiLmdldFJlcG9zaXRvcnkoV2FybnMpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3Qgd2FybnM6IFdhcm5zW10gPSBhd2FpdCB3YXJuUmVwby5maW5kKHsgdXNlcjogbWVtYmVyLmlkLCBndWlsZDogbWVzc2FnZS5ndWlsZC5pZCB9KTtcblxuICAgICAgICBpZighd2FybnMubGVuZ3RoKSB7IC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnV0aWwuc2VuZChcIk5vIE1vZCBMb2dzIGZvdW5kIGFib3V0IHRoaXMgdXNlclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluZnJhY3Rpb25zID0gYXdhaXQgUHJvbWlzZS5hbGwod2FybnMubWFwKGFzeW5jICAodjogV2FybnMsIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uc3QgbW9kOiBVc2VyID0gYXdhaXQgdGhpcy5jbGllbnQudXNlcnMuZmV0Y2godi5tb2RlcmF0b3IpLmNhdGNoKCgpID0+IG51bGwpO1xuICAgICAgICAgICAgaWYobW9kKSByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGluZGV4OiBpICsgMSxcbiAgICAgICAgICAgICAgICBtb2RlcmF0b3I6IG1vZC50YWcsXG4gICAgICAgICAgICAgICAgcmVhc29uOiB2LnJlYXNvblxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBtZXNzYWdlLnV0aWwuc2VuZChuZXcgTWVzc2FnZUVtYmVkKClcbiAgICAgICAgICAgIC5zZXRBdXRob3IoYE1vZExvZ3NgLCBtZW1iZXIudXNlci5kaXNwbGF5QXZhdGFyVVJMKHtkeW5hbWljOiB0cnVlfSkpXG4gICAgICAgICAgICAuc2V0Q29sb3IoXCIjRkYwMDAwXCIpXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgIC5zZXREZXNjcmlwdGlvbihpbmZyYWN0aW9ucy5tYXAodiA9PiBgXFxgIyR7di5pbmRleH1cXGAgfCBBY3Rpb246IFxcYFdhcm5cXGAgTW9kZXJhdG9yOiAqJHt2Lm1vZGVyYXRvcn0qXFxuIFJlYXNvbjogKiR7di5yZWFzb259KlxcbiBgKSlcbiAgICAgICAgKVxuICAgIH1cbn0iXX0=