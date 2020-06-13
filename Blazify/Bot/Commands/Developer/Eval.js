"use strict";
//@ts-nocheck
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
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const discord_akairo_1 = require("discord-akairo");
class Eval extends discord_akairo_1.Command {
    constructor() {
        super("eval", {
            aliases: ["eval", "evaluate"],
            category: "Developer",
            description: {
                content: "Evaluate?",
                usage: "<<eval",
                examples: [
                    "eval"
                ]
            },
            ratelimit: 3,
            ownerOnly: true,
            args: [
                {
                    id: "code",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: (msg) => `${msg.author} please tell a valid code to eval....`,
                    }
                }
            ]
        });
    }
    exec(message, { code }) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnEmbed;
            try {
                // we declare d as the Date timestamp when the evaluation started
                let d = Date.now();
                // here we evaluate the input
                let evaluated = yield eval(`${code}`);
                const evalType = evaluated ? evaluated.constructor.name : undefined;
                if (typeof evaluated !== "string") {
                    // we format the output as string
                    evaluated = util_1.inspect(evaluated, {
                        depth: 0
                    });
                }
                if (evaluated.length > 2000) {
                    const { key } = yield (yield fetch("https://hasteb.in/documents", {
                        body: evaluated,
                        method: "POST"
                    })).json();
                    evaluated = `https://hasteb.in/${key}`;
                }
                returnEmbed = new discord_js_1.MessageEmbed()
                    .setTitle("Evaluation Output")
                    .addField("Input", toJS(code))
                    .setDescription(evaluated.startsWith("https://hasteb.in")
                    ? `[Full Output](${evaluated})`
                    : toJS(evaluated))
                    .addField("Type", toJS(evalType))
                    .setFooter(`Evaluated in: ${Date.now() - d}ms`);
            }
            catch (e) {
                // if there was an error it's going to return this embed
                returnEmbed = new discord_js_1.MessageEmbed()
                    .setTitle("Evaluation Error")
                    .addField("Input", toJS(code))
                    .addField("Error", toJS(e));
            }
            return message.channel.send(returnEmbed);
        });
    }
}
exports.default = Eval;
;
function toJS(input) {
    return `\`\`\`js\n${input}\`\`\``;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NyYy9Cb3QvQ29tbWFuZHMvRGV2ZWxvcGVyL0V2YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGFBQWE7Ozs7Ozs7Ozs7O0FBRWIsMkNBQW1EO0FBQ25ELCtCQUErQjtBQUMvQixtREFBeUM7QUFFekMsTUFBcUIsSUFBSyxTQUFRLHdCQUFPO0lBQ3JDO1FBQ0ksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7WUFDN0IsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFO2dCQUNULE9BQU8sRUFBRSxXQUFXO2dCQUNwQixLQUFLLEVBQUUsUUFBUTtnQkFDZixRQUFRLEVBQUU7b0JBQ04sTUFBTTtpQkFDVDthQUNKO1lBQ0QsU0FBUyxFQUFFLENBQUM7WUFDWixTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUksRUFBRTtnQkFDRjtvQkFDSSxFQUFFLEVBQUUsTUFBTTtvQkFDVixJQUFJLEVBQUUsUUFBUTtvQkFDZCxLQUFLLEVBQUUsTUFBTTtvQkFDYixNQUFNLEVBQUU7d0JBQ0osS0FBSyxFQUFFLENBQUMsR0FBWSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLHVDQUF1QztxQkFDaEY7aUJBQ0o7YUFDSjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFWSxJQUFJLENBQUMsT0FBaUIsRUFBRSxFQUFDLElBQUksRUFBaUI7O1lBQ3ZELElBQUksV0FBVyxDQUFDO1lBRWhCLElBQUk7Z0JBQ0EsaUVBQWlFO2dCQUNqRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFHLENBQUM7Z0JBRXBCLDZCQUE2QjtnQkFDN0IsSUFBSSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBRSxDQUFDO2dCQUV6QyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBRXBFLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO29CQUMvQixpQ0FBaUM7b0JBQ2pDLFNBQVMsR0FBRyxjQUFPLENBQUcsU0FBUyxFQUFHO3dCQUM5QixLQUFLLEVBQUUsQ0FBQztxQkFDWCxDQUFFLENBQUM7aUJBQ1A7Z0JBQ0QsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRTtvQkFDekIsTUFBTSxFQUFDLEdBQUcsRUFBQyxHQUFHLE1BQU0sQ0FDaEIsTUFBTSxLQUFLLENBQUcsNkJBQTZCLEVBQUc7d0JBQzFDLElBQUksRUFBRSxTQUFTO3dCQUNmLE1BQU0sRUFBRSxNQUFNO3FCQUNqQixDQUFFLENBQ04sQ0FBQyxJQUFJLEVBQUcsQ0FBQztvQkFFVixTQUFTLEdBQUcscUJBQXFCLEdBQUcsRUFBRSxDQUFDO2lCQUMxQztnQkFFRCxXQUFXLEdBQUcsSUFBSSx5QkFBWSxFQUFHO3FCQUM1QixRQUFRLENBQUcsbUJBQW1CLENBQUU7cUJBQ2hDLFFBQVEsQ0FBRyxPQUFPLEVBQUcsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFFO3FCQUNwQyxjQUFjLENBQ1gsU0FBUyxDQUFDLFVBQVUsQ0FBRyxtQkFBbUIsQ0FBRTtvQkFDeEMsQ0FBQyxDQUFDLGlCQUFpQixTQUFTLEdBQUc7b0JBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUcsU0FBUyxDQUFFLENBQzNCO3FCQUNBLFFBQVEsQ0FBRyxNQUFNLEVBQUcsSUFBSSxDQUFHLFFBQVEsQ0FBRSxDQUFFO3FCQUN2QyxTQUFTLENBQUcsaUJBQWlCLElBQUksQ0FBQyxHQUFHLEVBQUcsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDO2FBQzNEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1Isd0RBQXdEO2dCQUN4RCxXQUFXLEdBQUcsSUFBSSx5QkFBWSxFQUFFO3FCQUMzQixRQUFRLENBQUcsa0JBQWtCLENBQUU7cUJBQy9CLFFBQVEsQ0FBRyxPQUFPLEVBQUcsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFDO3FCQUNuQyxRQUFRLENBQUcsT0FBTyxFQUFHLElBQUksQ0FBRyxDQUFDLENBQUUsQ0FBRSxDQUFDO2FBQzFDO1lBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRyxXQUFXLENBQUUsQ0FBQztRQUNoRCxDQUFDO0tBQUE7Q0FDSjtBQTVFRCx1QkE0RUM7QUFBQSxDQUFDO0FBRUYsU0FBUyxJQUFJLENBQUMsS0FBYTtJQUN2QixPQUFPLGFBQWEsS0FBSyxRQUFRLENBQUM7QUFDdEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vQHRzLW5vY2hlY2tcblxuaW1wb3J0IHsgTWVzc2FnZSwgTWVzc2FnZUVtYmVkIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IGluc3BlY3QgfSBmcm9tIFwidXRpbFwiO1xuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCJkaXNjb3JkLWFrYWlyb1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmFsIGV4dGVuZHMgQ29tbWFuZCB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcImV2YWxcIiwge1xuICAgICAgICAgICAgYWxpYXNlczogW1wiZXZhbFwiLCBcImV2YWx1YXRlXCJdLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IFwiRGV2ZWxvcGVyXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiRXZhbHVhdGU/XCIsXG4gICAgICAgICAgICAgICAgdXNhZ2U6IFwiPDxldmFsXCIsXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJldmFsXCJcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmF0ZWxpbWl0OiAzLFxuICAgICAgICAgICAgb3duZXJPbmx5OiB0cnVlLFxuICAgICAgICAgICAgYXJnczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY29kZVwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBtYXRjaDogXCJyZXN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHByb21wdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IChtc2c6IE1lc3NhZ2UpID0+IGAke21zZy5hdXRob3J9IHBsZWFzZSB0ZWxsIGEgdmFsaWQgY29kZSB0byBldmFsLi4uLmAsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjKG1lc3NhZ2UgOiBNZXNzYWdlLCB7Y29kZX06IHtjb2RlOiBzdHJpbmd9KSA6IFByb21pc2U8TWVzc2FnZT4ge1xuICAgICAgICBsZXQgcmV0dXJuRW1iZWQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIHdlIGRlY2xhcmUgZCBhcyB0aGUgRGF0ZSB0aW1lc3RhbXAgd2hlbiB0aGUgZXZhbHVhdGlvbiBzdGFydGVkXG4gICAgICAgICAgICBsZXQgZCA9IERhdGUubm93ICgpO1xuXG4gICAgICAgICAgICAvLyBoZXJlIHdlIGV2YWx1YXRlIHRoZSBpbnB1dFxuICAgICAgICAgICAgbGV0IGV2YWx1YXRlZCA9IGF3YWl0IGV2YWwgKCBgJHtjb2RlfWAgKTtcblxuICAgICAgICAgICAgY29uc3QgZXZhbFR5cGUgPSBldmFsdWF0ZWQgPyBldmFsdWF0ZWQuY29uc3RydWN0b3IubmFtZSA6IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBldmFsdWF0ZWQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAvLyB3ZSBmb3JtYXQgdGhlIG91dHB1dCBhcyBzdHJpbmdcbiAgICAgICAgICAgICAgICBldmFsdWF0ZWQgPSBpbnNwZWN0ICggZXZhbHVhdGVkICwge1xuICAgICAgICAgICAgICAgICAgICBkZXB0aDogMFxuICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmFsdWF0ZWQubGVuZ3RoID4gMjAwMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtrZXl9ID0gYXdhaXQgKFxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBmZXRjaCAoIFwiaHR0cHM6Ly9oYXN0ZWIuaW4vZG9jdW1lbnRzXCIgLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBldmFsdWF0ZWQgLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIlxuICAgICAgICAgICAgICAgICAgICB9IClcbiAgICAgICAgICAgICAgICApLmpzb24gKCk7XG5cbiAgICAgICAgICAgICAgICBldmFsdWF0ZWQgPSBgaHR0cHM6Ly9oYXN0ZWIuaW4vJHtrZXl9YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuRW1iZWQgPSBuZXcgTWVzc2FnZUVtYmVkICgpXG4gICAgICAgICAgICAgICAgLnNldFRpdGxlICggXCJFdmFsdWF0aW9uIE91dHB1dFwiIClcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQgKCBcIklucHV0XCIgLCB0b0pTICggY29kZSApIClcbiAgICAgICAgICAgICAgICAuc2V0RGVzY3JpcHRpb24gKFxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0ZWQuc3RhcnRzV2l0aCAoIFwiaHR0cHM6Ly9oYXN0ZWIuaW5cIiApXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGBbRnVsbCBPdXRwdXRdKCR7ZXZhbHVhdGVkfSlgXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRvSlMgKCBldmFsdWF0ZWQgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQgKCBcIlR5cGVcIiAsIHRvSlMgKCBldmFsVHlwZSApIClcbiAgICAgICAgICAgICAgICAuc2V0Rm9vdGVyICggYEV2YWx1YXRlZCBpbjogJHtEYXRlLm5vdyAoKSAtIGR9bXNgICk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIHdhcyBhbiBlcnJvciBpdCdzIGdvaW5nIHRvIHJldHVybiB0aGlzIGVtYmVkXG4gICAgICAgICAgICByZXR1cm5FbWJlZCA9IG5ldyBNZXNzYWdlRW1iZWQoKVxuICAgICAgICAgICAgICAgIC5zZXRUaXRsZSAoIFwiRXZhbHVhdGlvbiBFcnJvclwiIClcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQgKCBcIklucHV0XCIgLCB0b0pTICggY29kZSApKVxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZCAoIFwiRXJyb3JcIiAsIHRvSlMgKCBlICkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZXNzYWdlLmNoYW5uZWwuc2VuZCAoIHJldHVybkVtYmVkICk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gdG9KUyhpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFxcYFxcYFxcYGpzXFxuJHtpbnB1dH1cXGBcXGBcXGBgO1xufSJdfQ==