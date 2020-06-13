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
const Warns_1 = require("../../../Lib/Database/Models/Warns");
class Warn extends discord_akairo_1.Command {
    constructor() {
        super("warn", {
            aliases: ["warn"],
            category: "Moderation",
            description: {
                content: "Warns a user for breaking a rule",
                usage: "warn [member] [reason]",
                examples: [
                    "warn @user get wrecked"
                ]
            },
            ratelimit: 3,
            userPermissions: ["MANAGE_MESSAGES"],
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg) => `${msg.author} please tell a valid member to warn....`,
                        retry: (msg) => `${msg.author}, please provide a valid person to be warned`
                    }
                },
                {
                    id: "reason",
                    type: "string",
                    match: "rest",
                    default: "No reason has been provided"
                }
            ]
        });
    }
    exec(message, { member, reason }) {
        return __awaiter(this, void 0, void 0, function* () {
            const warnRepo = this.client.db.getRepository(Warns_1.Warns);
            if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.ownerID)
                return message.util.reply("This member has higher or equal role to you");
            yield warnRepo.insert({
                guild: message.guild.id,
                user: member.id,
                moderator: message.author.id,
                reason: reason
            });
            return message.util.send(`**${member.user.tag}** has been warned by **${message.author.tag}** for \`${reason}\``);
        });
    }
}
exports.default = Warn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2Fybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NyYy9Cb3QvQ29tbWFuZHMvTW9kZXJhdGlvbi9XYXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbURBQXdDO0FBSXhDLDhEQUEwRDtBQUUxRCxNQUFxQixJQUFLLFNBQVEsd0JBQU87SUFDckM7UUFDSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2pCLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRTtnQkFDVCxPQUFPLEVBQUUsa0NBQWtDO2dCQUMzQyxLQUFLLEVBQUUsd0JBQXdCO2dCQUMvQixRQUFRLEVBQUU7b0JBQ04sd0JBQXdCO2lCQUMzQjthQUNKO1lBQ0QsU0FBUyxFQUFFLENBQUM7WUFDWixlQUFlLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUNwQyxJQUFJLEVBQUU7Z0JBQ0Y7b0JBQ0UsRUFBRSxFQUFFLFFBQVE7b0JBQ1osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxDQUFDLEdBQVksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSx5Q0FBeUM7d0JBQy9FLEtBQUssRUFBRSxDQUFDLEdBQVksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSw4Q0FBOEM7cUJBQ3ZGO2lCQUNGO2dCQUNEO29CQUNJLEVBQUUsRUFBRSxRQUFRO29CQUNaLElBQUksRUFBRSxRQUFRO29CQUNkLEtBQUssRUFBRSxNQUFNO29CQUNiLE9BQU8sRUFBRSw2QkFBNkI7aUJBQ3pDO2FBQ0o7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ1ksSUFBSSxDQUFDLE9BQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUEyQzs7WUFDM0YsTUFBTSxRQUFRLEdBQXNCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFLLENBQUMsQ0FBQztZQUN4RSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFRLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLE9BQVEsQ0FBQyxLQUFNLENBQUMsT0FBTztnQkFDeEgsT0FBTyxPQUFRLENBQUMsSUFBSyxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1lBRS9FLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDbEIsS0FBSyxFQUFFLE9BQVEsQ0FBQyxLQUFNLENBQUMsRUFBRTtnQkFDekIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNmLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQTtZQUVGLE9BQU8sT0FBUSxDQUFDLElBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsMkJBQTJCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDeEgsQ0FBQztLQUFBO0NBQ0o7QUE5Q0QsdUJBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZH0gZnJvbSBcImRpc2NvcmQtYWthaXJvXCI7XG5pbXBvcnQge01lc3NhZ2UsIEd1aWxkTWVtYmVyfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgUmVwb3NpdG9yeSB9IGZyb20gXCJ0eXBlb3JtXCI7XG5cbmltcG9ydCB7IFdhcm5zIH0gZnJvbSBcIi4uLy4uLy4uL0xpYi9EYXRhYmFzZS9Nb2RlbHMvV2FybnNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXJuIGV4dGVuZHMgQ29tbWFuZHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwid2FyblwiLCB7XG4gICAgICAgICAgICBhbGlhc2VzOiBbXCJ3YXJuXCJdLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IFwiTW9kZXJhdGlvblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIldhcm5zIGEgdXNlciBmb3IgYnJlYWtpbmcgYSBydWxlXCIsXG4gICAgICAgICAgICAgICAgdXNhZ2U6IFwid2FybiBbbWVtYmVyXSBbcmVhc29uXVwiLFxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIFwid2FybiBAdXNlciBnZXQgd3JlY2tlZFwiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJhdGVsaW1pdDogMyxcbiAgICAgICAgICAgIHVzZXJQZXJtaXNzaW9uczogW1wiTUFOQUdFX01FU1NBR0VTXCJdLFxuICAgICAgICAgICAgYXJnczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlkOiBcIm1lbWJlclwiLFxuICAgICAgICAgICAgICAgICAgdHlwZTogXCJtZW1iZXJcIixcbiAgICAgICAgICAgICAgICAgIHByb21wdDoge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAobXNnOiBNZXNzYWdlKSA9PiBgJHttc2cuYXV0aG9yfSBwbGVhc2UgdGVsbCBhIHZhbGlkIG1lbWJlciB0byB3YXJuLi4uLmAsXG4gICAgICAgICAgICAgICAgICAgICAgcmV0cnk6IChtc2c6IE1lc3NhZ2UpID0+IGAke21zZy5hdXRob3J9LCBwbGVhc2UgcHJvdmlkZSBhIHZhbGlkIHBlcnNvbiB0byBiZSB3YXJuZWRgXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInJlYXNvblwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaDogXCJyZXN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFwiTm8gcmVhc29uIGhhcyBiZWVuIHByb3ZpZGVkXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgYXN5bmMgZXhlYyhtZXNzYWdlOiBNZXNzYWdlLCB7IG1lbWJlciwgcmVhc29uIH06IHsgbWVtYmVyOiBHdWlsZE1lbWJlciwgcmVhc29uOiBzdHJpbmcgfSk6IFByb21pc2U8TWVzc2FnZT4ge1xuICAgICAgICBjb25zdCB3YXJuUmVwbzogUmVwb3NpdG9yeTxXYXJucz4gPSB0aGlzLmNsaWVudC5kYi5nZXRSZXBvc2l0b3J5KFdhcm5zKTtcbiAgICAgICAgaWYgKG1lbWJlci5yb2xlcy5oaWdoZXN0LnBvc2l0aW9uID49IG1lc3NhZ2UhLm1lbWJlciEucm9sZXMuaGlnaGVzdC5wb3NpdGlvbiAmJiBtZXNzYWdlLmF1dGhvci5pZCAhPSBtZXNzYWdlIS5ndWlsZCEub3duZXJJRClcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlIS51dGlsIS5yZXBseShcIlRoaXMgbWVtYmVyIGhhcyBoaWdoZXIgb3IgZXF1YWwgcm9sZSB0byB5b3VcIik7XG5cbiAgICAgICAgYXdhaXQgd2FyblJlcG8uaW5zZXJ0KHtcbiAgICAgICAgICAgIGd1aWxkOiBtZXNzYWdlIS5ndWlsZCEuaWQsXG4gICAgICAgICAgICB1c2VyOiBtZW1iZXIuaWQsXG4gICAgICAgICAgICBtb2RlcmF0b3I6IG1lc3NhZ2UuYXV0aG9yLmlkLFxuICAgICAgICAgICAgcmVhc29uOiByZWFzb25cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gbWVzc2FnZSEudXRpbCEuc2VuZChgKioke21lbWJlci51c2VyLnRhZ30qKiBoYXMgYmVlbiB3YXJuZWQgYnkgKioke21lc3NhZ2UuYXV0aG9yLnRhZ30qKiBmb3IgXFxgJHtyZWFzb259XFxgYCk7XG4gICAgfVxufSJdfQ==