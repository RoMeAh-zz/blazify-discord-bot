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
const path_1 = require("path");
const Config_1 = require("../../Config");
const Database_1 = __importDefault(require("../Database/Database"));
const rss_parser_1 = __importDefault(require("rss-parser"));
class BlazifyClient extends discord_akairo_1.AkairoClient {
    constructor(config) {
        super({
            ownerID: config.ownerID
        });
        this.listnerHandler = new discord_akairo_1.ListenerHandler(this, {
            directory: path_1.join(__dirname, "../" + "..", "Bot/Events/")
        });
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            directory: path_1.join(__dirname, "../" + "..", "Bot/Commands/"),
            prefix: Config_1.prefix,
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            blockBots: true,
            blockClient: true,
            commandUtilLifetime: 30,
            defaultCooldown: 60000,
            argumentDefaults: {
                prompt: {
                    modifyStart: (_, str) => `${str}\n\n Type \`cancel\` to cancel the command`,
                    modifyRetry: (_, str) => `${str}\n\n Type \`cancel\` to cancel the command`,
                    timeout: "You took too long to respond to the command",
                    ended: "You exceeded the maximum number of tries",
                    cancel: "This command has been cancelled",
                    retries: 3
                },
                otherwise: ""
            },
            ignorePermissions: Config_1.ownerID
        });
        this.config = config;
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.commandHandler.useListenerHandler(this.listnerHandler);
            this.listnerHandler.setEmitters({
                commandHandler: this.commandHandler,
                listnerHandler: this.listnerHandler,
                process
            });
            this.commandHandler.loadAll();
            this.listnerHandler.loadAll();
            this.request = new (rss_parser_1.default)();
            this.db = Database_1.default.get();
            yield this.db.connect();
            yield this.db.synchronize();
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._init();
            return this.login(this.config.token);
        });
    }
}
exports.default = BlazifyClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxhemlmeUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NyYy9MaWIvQ2xpZW50L0JsYXppZnlDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBK0U7QUFFL0UsK0JBQTRCO0FBQzVCLHlDQUF1RDtBQUV2RCxvRUFBNEM7QUFDNUMsNERBQTZCO0FBZ0I3QixNQUFxQixhQUFjLFNBQVEsNkJBQVk7SUE4Qm5ELFlBQW1CLE1BQWtCO1FBQ2pDLEtBQUssQ0FBQztZQUNGLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztTQUMxQixDQUFDLENBQUM7UUE3QkEsbUJBQWMsR0FBb0IsSUFBSSxnQ0FBZSxDQUFDLElBQUksRUFBRTtZQUMvRCxTQUFTLEVBQUUsV0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLGFBQWEsQ0FBQztTQUMxRCxDQUFDLENBQUE7UUFDSyxtQkFBYyxHQUFtQixJQUFJLCtCQUFjLENBQUMsSUFBSSxFQUFFO1lBQzdELFNBQVMsRUFBRSxXQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsZUFBZSxDQUFDO1lBQ3pELE1BQU0sRUFBRSxlQUFNO1lBQ2QsWUFBWSxFQUFFLElBQUk7WUFDbEIsV0FBVyxFQUFFLElBQUk7WUFDakIsV0FBVyxFQUFFLElBQUk7WUFDakIsU0FBUyxFQUFFLElBQUk7WUFDZixXQUFXLEVBQUUsSUFBSTtZQUNqQixtQkFBbUIsRUFBRSxFQUFFO1lBQ3ZCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLGdCQUFnQixFQUFFO2dCQUNkLE1BQU0sRUFBRTtvQkFDSixXQUFXLEVBQUUsQ0FBQyxDQUFTLEVBQUUsR0FBVyxFQUFVLEVBQUUsQ0FBQyxHQUFHLEdBQUcsNENBQTRDO29CQUNuRyxXQUFXLEVBQUUsQ0FBQyxDQUFTLEVBQUUsR0FBVyxFQUFVLEVBQUUsQ0FBQyxHQUFHLEdBQUcsNENBQTRDO29CQUNuRyxPQUFPLEVBQUUsNkNBQTZDO29CQUN0RCxLQUFLLEVBQUUsMENBQTBDO29CQUNqRCxNQUFNLEVBQUUsaUNBQWlDO29CQUN6QyxPQUFPLEVBQUUsQ0FBQztpQkFDYjtnQkFDRCxTQUFTLEVBQUUsRUFBRTthQUNoQjtZQUNELGlCQUFpQixFQUFFLGdCQUFPO1NBQzdCLENBQUMsQ0FBQztRQU1DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFYSxLQUFLOztZQUNmLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO2dCQUM1QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQ25DLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztnQkFDbkMsT0FBTzthQUNWLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUU5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxvQkFBRyxDQUFDLEVBQUUsQ0FBQztZQUczQixJQUFJLENBQUMsRUFBRSxHQUFHLGtCQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekIsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxDQUFDO0tBQUE7SUFDWSxLQUFLOztZQUNkLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3hDLENBQUM7S0FBQTtDQUNKO0FBNURELGdDQTREQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFrYWlyb0NsaWVudCwgQ29tbWFuZEhhbmRsZXIsIExpc3RlbmVySGFuZGxlciB9IGZyb20gXCJkaXNjb3JkLWFrYWlyb1wiO1xuaW1wb3J0IHsgIE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQge3ByZWZpeCAsIG93bmVySUQgLCBkYk5hbWV9IGZyb20gXCIuLi8uLi9Db25maWdcIjtcbmltcG9ydCB7IENvbm5lY3Rpb24gfSBmcm9tIFwidHlwZW9ybVwiXG5pbXBvcnQgRGF0YWJhc2UgIGZyb20gXCIuLi9EYXRhYmFzZS9EYXRhYmFzZVwiXG5pbXBvcnQgcnNzIGZyb20gXCJyc3MtcGFyc2VyXCI7XG5cbmRlY2xhcmUgbW9kdWxlIFwiZGlzY29yZC1ha2Fpcm9cIiB7XG4gICAgaW50ZXJmYWNlIEFrYWlyb0NsaWVudCB7XG4gICAgICAgIGNvbW1hbmRIYW5kbGVyOiBDb21tYW5kSGFuZGxlclxuICAgICAgICBsaXN0bmVySGFuZGxlcjogTGlzdGVuZXJIYW5kbGVyXG4gICAgICAgIGRiOiBDb25uZWN0aW9uO1xuICAgICAgICByZXF1ZXN0OiByc3M7XG4gICAgfVxufVxuaW50ZXJmYWNlIEJvdE9wdGlvbnN7XG4gICAgdG9rZW4/IDogc3RyaW5nXG4gICAgb3duZXJJRD8gOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxhemlmeUNsaWVudCBleHRlbmRzIEFrYWlyb0NsaWVudCB7XG4gICAgcHVibGljIGNvbmZpZzogQm90T3B0aW9ucztcbiAgICBwdWJsaWMgZGIhOiBDb25uZWN0aW9uO1xuICAgIHB1YmxpYyByZXF1ZXN0ITogcnNzO1xuICAgIHB1YmxpYyBsaXN0bmVySGFuZGxlcjogTGlzdGVuZXJIYW5kbGVyID0gbmV3IExpc3RlbmVySGFuZGxlcih0aGlzLCB7XG4gICAgICAgIGRpcmVjdG9yeTogam9pbihfX2Rpcm5hbWUsIFwiLi4vXCIgKyBcIi4uXCIsIFwiQm90L0V2ZW50cy9cIilcbiAgICB9KVxuICAgIHB1YmxpYyBjb21tYW5kSGFuZGxlcjogQ29tbWFuZEhhbmRsZXIgPSBuZXcgQ29tbWFuZEhhbmRsZXIodGhpcywge1xuICAgICAgICBkaXJlY3Rvcnk6IGpvaW4oX19kaXJuYW1lLCBcIi4uL1wiICsgXCIuLlwiLCBcIkJvdC9Db21tYW5kcy9cIiksXG4gICAgICAgIHByZWZpeDogcHJlZml4LFxuICAgICAgICBhbGxvd01lbnRpb246IHRydWUsXG4gICAgICAgIGhhbmRsZUVkaXRzOiB0cnVlLFxuICAgICAgICBjb21tYW5kVXRpbDogdHJ1ZSxcbiAgICAgICAgYmxvY2tCb3RzOiB0cnVlLFxuICAgICAgICBibG9ja0NsaWVudDogdHJ1ZSxcbiAgICAgICAgY29tbWFuZFV0aWxMaWZldGltZTogMzAsXG4gICAgICAgIGRlZmF1bHRDb29sZG93bjogNjAwMDAsXG4gICAgICAgIGFyZ3VtZW50RGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHByb21wdDoge1xuICAgICAgICAgICAgICAgIG1vZGlmeVN0YXJ0OiAoXzpNZXNzYWdlLCBzdHI6IHN0cmluZyk6IHN0cmluZyA9PiBgJHtzdHJ9XFxuXFxuIFR5cGUgXFxgY2FuY2VsXFxgIHRvIGNhbmNlbCB0aGUgY29tbWFuZGAsXG4gICAgICAgICAgICAgICAgbW9kaWZ5UmV0cnk6IChfOk1lc3NhZ2UsIHN0cjogc3RyaW5nKTogc3RyaW5nID0+IGAke3N0cn1cXG5cXG4gVHlwZSBcXGBjYW5jZWxcXGAgdG8gY2FuY2VsIHRoZSBjb21tYW5kYCxcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiBcIllvdSB0b29rIHRvbyBsb25nIHRvIHJlc3BvbmQgdG8gdGhlIGNvbW1hbmRcIixcbiAgICAgICAgICAgICAgICBlbmRlZDogXCJZb3UgZXhjZWVkZWQgdGhlIG1heGltdW0gbnVtYmVyIG9mIHRyaWVzXCIsXG4gICAgICAgICAgICAgICAgY2FuY2VsOiBcIlRoaXMgY29tbWFuZCBoYXMgYmVlbiBjYW5jZWxsZWRcIixcbiAgICAgICAgICAgICAgICByZXRyaWVzOiAzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3RoZXJ3aXNlOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGlnbm9yZVBlcm1pc3Npb25zOiBvd25lcklEXG4gICAgfSk7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogQm90T3B0aW9ucykge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBvd25lcklEOiBjb25maWcub3duZXJJRFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9pbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLmNvbW1hbmRIYW5kbGVyLnVzZUxpc3RlbmVySGFuZGxlcih0aGlzLmxpc3RuZXJIYW5kbGVyKTtcbiAgICAgICAgdGhpcy5saXN0bmVySGFuZGxlci5zZXRFbWl0dGVycyh7XG4gICAgICAgICAgICBjb21tYW5kSGFuZGxlcjogdGhpcy5jb21tYW5kSGFuZGxlcixcbiAgICAgICAgICAgIGxpc3RuZXJIYW5kbGVyOiB0aGlzLmxpc3RuZXJIYW5kbGVyLFxuICAgICAgICAgICAgcHJvY2Vzc1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbW1hbmRIYW5kbGVyLmxvYWRBbGwoKTtcbiAgICAgICAgdGhpcy5saXN0bmVySGFuZGxlci5sb2FkQWxsKCk7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gbmV3IChyc3MpKCk7XG5cblxuICAgICAgICB0aGlzLmRiID0gRGF0YWJhc2UuZ2V0KCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZGIuY29ubmVjdCgpO1xuICAgICAgICBhd2FpdCB0aGlzLmRiLnN5bmNocm9uaXplKCk7XG4gICAgfVxuICAgIHB1YmxpYyBhc3luYyBzdGFydCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBhd2FpdCB0aGlzLl9pbml0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luKHRoaXMuY29uZmlnLnRva2VuKVxuICAgIH1cbn0iXX0=