"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("./Config");
const BlazifyClient_1 = __importDefault(require("./Lib/Client/BlazifyClient"));
const client = new BlazifyClient_1.default({ token: Config_1.token, ownerID: Config_1.ownerID });
client.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vU3JjL0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUF5QztBQUN6QywrRUFBdUQ7QUFFdkQsTUFBTSxNQUFNLEdBQWtCLElBQUksdUJBQWEsQ0FBQyxFQUFFLEtBQUssRUFBTCxjQUFLLEVBQUUsT0FBTyxFQUFQLGdCQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ25FLE1BQU0sQ0FBQyxLQUFLLEVBQUcsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRva2VuLCBvd25lcklEIH0gZnJvbSBcIi4vQ29uZmlnXCJcbmltcG9ydCBCbGF6aWZ5Q2xpZW50IGZyb20gXCIuL0xpYi9DbGllbnQvQmxhemlmeUNsaWVudFwiO1xuXG5jb25zdCBjbGllbnQ6IEJsYXppZnlDbGllbnQgPSBuZXcgQmxhemlmeUNsaWVudCh7IHRva2VuLCBvd25lcklEIH0pXG5jbGllbnQuc3RhcnQgKClcbiJdfQ==