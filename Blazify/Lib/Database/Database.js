"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Config_1 = require("../../Config");
const connectionManager = new typeorm_1.ConnectionManager();
connectionManager.create({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: Config_1.dbName,
    entities: [
        __dirname + "/Models/*.js"
    ],
    synchronize: true,
});
exports.default = connectionManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9TcmMvTGliL0RhdGFiYXNlL0RhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQTRDO0FBQzVDLHlDQUFzQztBQUV0QyxNQUFNLGlCQUFpQixHQUFzQixJQUFJLDJCQUFpQixFQUFFLENBQUM7QUFDckUsaUJBQWlCLENBQUMsTUFBTSxDQUFDO0lBQ3JCLElBQUksRUFBRSxPQUFPO0lBQ2IsSUFBSSxFQUFFLFdBQVc7SUFDakIsSUFBSSxFQUFFLElBQUk7SUFDVixRQUFRLEVBQUUsTUFBTTtJQUNoQixRQUFRLEVBQUUsVUFBVTtJQUNwQixRQUFRLEVBQUUsZUFBTTtJQUNoQixRQUFRLEVBQUU7UUFDTixTQUFTLEdBQUcsY0FBYztLQUM3QjtJQUNELFdBQVcsRUFBRSxJQUFJO0NBQ3BCLENBQUMsQ0FBQztBQUNILGtCQUFlLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29ubmVjdGlvbk1hbmFnZXIgfSBmcm9tIFwidHlwZW9ybVwiO1xuaW1wb3J0IHsgZGJOYW1lIH0gZnJvbSBcIi4uLy4uL0NvbmZpZ1wiO1xuXG5jb25zdCBjb25uZWN0aW9uTWFuYWdlcjogQ29ubmVjdGlvbk1hbmFnZXIgPSBuZXcgQ29ubmVjdGlvbk1hbmFnZXIoKTtcbmNvbm5lY3Rpb25NYW5hZ2VyLmNyZWF0ZSh7XG4gICAgdHlwZTogXCJteXNxbFwiLFxuICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgcG9ydDogMzMwNixcbiAgICB1c2VybmFtZTogXCJyb290XCIsXG4gICAgcGFzc3dvcmQ6IFwicGFzc3dvcmRcIixcbiAgICBkYXRhYmFzZTogZGJOYW1lLFxuICAgIGVudGl0aWVzOiBbXG4gICAgICAgIF9fZGlybmFtZSArIFwiL01vZGVscy8qLmpzXCJcbiAgICBdLFxuICAgIHN5bmNocm9uaXplOiB0cnVlLFxufSk7XG5leHBvcnQgZGVmYXVsdCBjb25uZWN0aW9uTWFuYWdlcjtcbiJdfQ==