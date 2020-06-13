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
const lavajs_1 = require("@anonymousg/lavajs");
class Join extends discord_akairo_1.Command {
    constructor() {
        super("join", {
            aliases: ["join", "vcjoin"],
            category: "Music",
            description: {
                content: "Joins a Voice Channel so that Music can be player",
                examples: [
                    "<<join"
                ]
            },
            ratelimit: 3,
        });
    }
    exec(message) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel))
                return (_b = message.util) === null || _b === void 0 ? void 0 : _b.send(`${message.author} you are not present in any voice channel.`);
            //@ts-ignore
            yield ((_c = this.client.music) === null || _c === void 0 ? void 0 : _c.spawnPlayer(lavajs_1.LavaClient, {
                guild: (_d = message.guild) === null || _d === void 0 ? void 0 : _d.id,
                voiceChannel: message.member.voice.channel,
                textChannel: message.channel,
                deafen: true,
                trackRepeat: false,
                queueRepeat: false,
                skipOnError: true
            }));
            // @ts-ignore
            message.util.send(new discord_js_1.MessageEmbed()
                .setAuthor("*Joined Voice Channel and I am ready..*")
                .setColor("GREEN")
                .setDescription(`\n
            \`Text Channel\`: ${message.channel}\n
            \`Voice Channel\`: ${(_e = message.member) === null || _e === void 0 ? void 0 : _e.voice.channel}\n
            \`Guild Name\`: ${(_f = message.guild) === null || _f === void 0 ? void 0 : _f.name}`));
        });
    }
}
exports.default = Join;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NyYy9Cb3QvQ29tbWFuZHMvTXVzaWMvSm9pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1EQUF5QztBQUN6QywyQ0FBbUQ7QUFDbkQsK0NBQWdEO0FBRWhELE1BQXFCLElBQUssU0FBUSx3QkFBTztJQUNyQztRQUNJLEtBQUssQ0FBRSxNQUFNLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO1lBQzNCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRTtnQkFDVCxPQUFPLEVBQUUsbURBQW1EO2dCQUM1RCxRQUFRLEVBQUU7b0JBQ04sUUFBUTtpQkFDWDthQUNKO1lBQ0QsU0FBUyxFQUFFLENBQUM7U0FDZixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ1ksSUFBSSxDQUFDLE9BQWlCOzs7WUFDL0IsSUFBRyxRQUFDLE9BQU8sQ0FBQyxNQUFNLDBDQUFFLEtBQUssQ0FBQyxPQUFPLENBQUE7Z0JBQUUsYUFBTyxPQUFPLENBQUMsSUFBSSwwQ0FBRSxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSw0Q0FBNEMsRUFBQztZQUMzSCxZQUFZO1lBQ1osYUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssMENBQUUsV0FBVyxDQUFDLG1CQUFVLEVBQUU7Z0JBQzdDLEtBQUssUUFBRSxPQUFPLENBQUMsS0FBSywwQ0FBRSxFQUFFO2dCQUN4QixZQUFZLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTztnQkFDMUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2dCQUM1QixNQUFNLEVBQUUsSUFBSTtnQkFDWixXQUFXLEVBQUUsS0FBSztnQkFDbEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFdBQVcsRUFBRSxJQUFJO2FBQ3BCLEVBQUMsQ0FBQztZQUNILGFBQWE7WUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFZLEVBQUU7aUJBQy9CLFNBQVMsQ0FBQyx5Q0FBeUMsQ0FBQztpQkFDcEQsUUFBUSxDQUFDLE9BQU8sQ0FBQztpQkFDakIsY0FBYyxDQUFDO2dDQUNJLE9BQU8sQ0FBQyxPQUFPO2lDQUNkLE1BQUEsT0FBTyxDQUFDLE1BQU0sMENBQUUsS0FBSyxDQUFDLE9BQU87OEJBQ2hDLE1BQUEsT0FBTyxDQUFDLEtBQUssMENBQUUsSUFBSSxFQUFFLENBQUMsQ0FDM0MsQ0FBQTs7S0FDSjtDQUNKO0FBcENELHVCQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiZGlzY29yZC1ha2Fpcm9cIjtcbmltcG9ydCB7IE1lc3NhZ2VFbWJlZCwgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBMYXZhQ2xpZW50IH0gZnJvbSBcIkBhbm9ueW1vdXNnL2xhdmFqc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2luIGV4dGVuZHMgQ29tbWFuZCB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciAoXCJqb2luXCIsIHtcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcImpvaW5cIiwgXCJ2Y2pvaW5cIl0sXG4gICAgICAgICAgICBjYXRlZ29yeTogXCJNdXNpY1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIkpvaW5zIGEgVm9pY2UgQ2hhbm5lbCBzbyB0aGF0IE11c2ljIGNhbiBiZSBwbGF5ZXJcIixcbiAgICAgICAgICAgICAgICBleGFtcGxlczogW1xuICAgICAgICAgICAgICAgICAgICBcIjw8am9pblwiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJhdGVsaW1pdDogMyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBhc3luYyBleGVjKG1lc3NhZ2UgOiBNZXNzYWdlKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGlmKCFtZXNzYWdlLm1lbWJlcj8udm9pY2UuY2hhbm5lbCkgcmV0dXJuIG1lc3NhZ2UudXRpbD8uc2VuZChgJHttZXNzYWdlLmF1dGhvcn0geW91IGFyZSBub3QgcHJlc2VudCBpbiBhbnkgdm9pY2UgY2hhbm5lbC5gKVxuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQubXVzaWM/LnNwYXduUGxheWVyKExhdmFDbGllbnQsIHtcbiAgICAgICAgICAgIGd1aWxkOiBtZXNzYWdlLmd1aWxkPy5pZCxcbiAgICAgICAgICAgIHZvaWNlQ2hhbm5lbDogbWVzc2FnZS5tZW1iZXIudm9pY2UuY2hhbm5lbCxcbiAgICAgICAgICAgIHRleHRDaGFubmVsOiBtZXNzYWdlLmNoYW5uZWwsXG4gICAgICAgICAgICBkZWFmZW46IHRydWUsXG4gICAgICAgICAgICB0cmFja1JlcGVhdDogZmFsc2UsXG4gICAgICAgICAgICBxdWV1ZVJlcGVhdDogZmFsc2UsXG4gICAgICAgICAgICBza2lwT25FcnJvcjogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBtZXNzYWdlLnV0aWwuc2VuZChuZXcgTWVzc2FnZUVtYmVkKClcbiAgICAgICAgICAgIC5zZXRBdXRob3IoXCIqSm9pbmVkIFZvaWNlIENoYW5uZWwgYW5kIEkgYW0gcmVhZHkuLipcIilcbiAgICAgICAgICAgIC5zZXRDb2xvcihcIkdSRUVOXCIpXG4gICAgICAgICAgICAuc2V0RGVzY3JpcHRpb24oYFxcblxuICAgICAgICAgICAgXFxgVGV4dCBDaGFubmVsXFxgOiAke21lc3NhZ2UuY2hhbm5lbH1cXG5cbiAgICAgICAgICAgIFxcYFZvaWNlIENoYW5uZWxcXGA6ICR7bWVzc2FnZS5tZW1iZXI/LnZvaWNlLmNoYW5uZWx9XFxuXG4gICAgICAgICAgICBcXGBHdWlsZCBOYW1lXFxgOiAke21lc3NhZ2UuZ3VpbGQ/Lm5hbWV9YClcbiAgICAgICAgKVxuICAgIH1cbn0iXX0=