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
exports.Home = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Home = class Home {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, jumbotronTitle: { required: true, type: () => String }, mainTitle: { required: true, type: () => String }, mainParagraph: { required: true, type: () => String }, sideParagraph: { required: true, type: () => String }, subTitle: { required: true, type: () => String }, subParagraph: { required: true, type: () => String }, accountId: { required: true, type: () => String } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Home.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Home.prototype, "jumbotronTitle", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Home.prototype, "mainTitle", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Home.prototype, "mainParagraph", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Home.prototype, "sideParagraph", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Home.prototype, "subTitle", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Home.prototype, "subParagraph", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Home.prototype, "accountId", void 0);
Home = __decorate([
    typeorm_1.Entity()
], Home);
exports.Home = Home;
//# sourceMappingURL=home.entity.js.map