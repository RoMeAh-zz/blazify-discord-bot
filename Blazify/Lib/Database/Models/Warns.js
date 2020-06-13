"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warns = void 0;
const typeorm_1 = require("typeorm");
let Warns = class Warns {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Warns.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 22 }),
    __metadata("design:type", String)
], Warns.prototype, "guild", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 22 }),
    __metadata("design:type", String)
], Warns.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 22 }),
    __metadata("design:type", String)
], Warns.prototype, "moderator", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Warns.prototype, "reason", void 0);
Warns = __decorate([
    typeorm_1.Entity("warns")
], Warns);
exports.Warns = Warns;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FybnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9TcmMvTGliL0RhdGFiYXNlL01vZGVscy9XYXJucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBaUU7QUFHakUsSUFBYSxLQUFLLEdBQWxCLE1BQWEsS0FBSztDQWVqQixDQUFBO0FBYkc7SUFEQyxnQ0FBc0IsRUFBRTs7aUNBQ2Q7QUFHWDtJQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQzs7b0NBQ3hCO0FBR2Q7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7O21DQUMzQjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDOzt3Q0FDdEI7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOztxQ0FDVDtBQWROLEtBQUs7SUFEakIsZ0JBQU0sQ0FBQyxPQUFPLENBQUM7R0FDSCxLQUFLLENBZWpCO0FBZlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHksIENvbHVtbiwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiB9IGZyb20gXCJ0eXBlb3JtXCI7XG5cbkBFbnRpdHkoXCJ3YXJuc1wiKVxuZXhwb3J0IGNsYXNzIFdhcm5zIHtcbiAgICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gICAgaWQhOiBudW1iZXJcblxuICAgIEBDb2x1bW4oe3R5cGU6IFwidmFyY2hhclwiLCBsZW5ndGg6IDIyfSlcbiAgICBndWlsZCE6IHN0cmluZ1xuXG4gICAgQENvbHVtbih7IHR5cGU6IFwidmFyY2hhclwiLCBsZW5ndGg6IDIyIH0pXG4gICAgdXNlciE6IHN0cmluZ1xuXG4gICAgQENvbHVtbih7IHR5cGU6IFwidmFyY2hhclwiLCBsZW5ndGg6IDIyIH0pXG4gICAgbW9kZXJhdG9yITogc3RyaW5nXG5cbiAgICBAQ29sdW1uKHsgdHlwZTogXCJ0ZXh0XCJ9KVxuICAgIHJlYXNvbiE6IHN0cmluZ1xufSJdfQ==