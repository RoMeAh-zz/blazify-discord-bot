"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class PingCommand extends discord_akairo_1.Command {
    constructor() {
        super("ping", {
            aliases: ["ping", "pong"],
            category: "Utility",
            description: {
                content: "Check the latency of the bot to the Discord API",
                usage: "<<ping",
                examples: [
                    "ping"
                ]
            },
            ratelimit: 3
        });
    }
    exec(message) {
        let Pong = Date.now() - message.createdTimestamp;
        // @ts-ignore
        return message.util.send(`Pong! **Response Time:** \`${Pong}\`ms. **Discord API Latency:** \`${this.client.ws.ping}\`ms`);
    }
    ;
}
exports.default = PingCommand;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGluZ0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9TcmMvQm90L0NvbW1hbmRzL1V0aWxpdHkvUGluZ0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUM7QUFHekMsTUFBcUIsV0FBWSxTQUFRLHdCQUFPO0lBQzVDO1FBQ0ksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDekIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFO2dCQUNULE9BQU8sRUFBRSxpREFBaUQ7Z0JBQzFELEtBQUssRUFBRSxRQUFRO2dCQUNmLFFBQVEsRUFBRTtvQkFDTixNQUFNO2lCQUNUO2FBQ0o7WUFDRCxTQUFTLEVBQUUsQ0FBQztTQUNmLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxJQUFJLENBQUMsT0FBZ0I7UUFDeEIsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQTtRQUN4RCxhQUFhO1FBQ2IsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsSUFBSSxvQ0FBb0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQztJQUM5SCxDQUFDO0lBQUEsQ0FBQztDQUNMO0FBckJELDhCQXFCQztBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcImRpc2NvcmQtYWthaXJvXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGluZ0NvbW1hbmQgZXh0ZW5kcyBDb21tYW5kIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwicGluZ1wiLCB7XG4gICAgICAgICAgICBhbGlhc2VzOiBbXCJwaW5nXCIsIFwicG9uZ1wiXSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiBcIlV0aWxpdHlcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCJDaGVjayB0aGUgbGF0ZW5jeSBvZiB0aGUgYm90IHRvIHRoZSBEaXNjb3JkIEFQSVwiLFxuICAgICAgICAgICAgICAgIHVzYWdlOiBcIjw8cGluZ1wiLFxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIFwicGluZ1wiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJhdGVsaW1pdDogM1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlYyhtZXNzYWdlOiBNZXNzYWdlKTogUHJvbWlzZTxNZXNzYWdlPiB7XG4gICAgICAgIGxldCBQb25nOiBudW1iZXIgPSBEYXRlLm5vdygpIC0gbWVzc2FnZS5jcmVhdGVkVGltZXN0YW1wXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UudXRpbC5zZW5kKGBQb25nISAqKlJlc3BvbnNlIFRpbWU6KiogXFxgJHtQb25nfVxcYG1zLiAqKkRpc2NvcmQgQVBJIExhdGVuY3k6KiogXFxgJHt0aGlzLmNsaWVudC53cy5waW5nfVxcYG1zYCk7XG4gICAgfTtcbn07Il19