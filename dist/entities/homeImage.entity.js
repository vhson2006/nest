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
exports.HomeImage = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let HomeImage = class HomeImage {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, homeId: { required: true, type: () => String }, imageId: { required: true, type: () => String } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], HomeImage.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], HomeImage.prototype, "homeId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], HomeImage.prototype, "imageId", void 0);
HomeImage = __decorate([
    typeorm_1.Entity()
], HomeImage);
exports.HomeImage = HomeImage;
//# sourceMappingURL=homeImage.entity.js.map