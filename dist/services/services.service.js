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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const typeorm_2 = require("typeorm");
const service_entity_1 = require("../entities/service.entity");
let ServicesService = class ServicesService {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    findAll(paginationQuery) {
        const { limit, offset } = paginationQuery;
        return this.serviceRepository.find({
            skip: offset,
            take: limit,
        });
    }
    async findOne(id) {
        const service = await this.serviceRepository.findOne(id);
        if (!service) {
            throw new common_1.NotFoundException(`Service #${id} not found`);
        }
        return service;
    }
    async create(createServiceDto) {
        const service = this.serviceRepository.create(Object.assign({}, createServiceDto));
        return this.serviceRepository.save(service);
    }
    async update(id, updateServiceDto) {
        const service = await this.serviceRepository.preload(Object.assign({}, updateServiceDto));
        if (!service) {
            throw new common_1.NotFoundException(`Service #${id} not found`);
        }
        return this.serviceRepository.save(service);
    }
    async remove(id) {
        const service = await this.findOne(id);
        return this.serviceRepository.remove(service);
    }
};
ServicesService = __decorate([
    common_1.Injectable({ scope: common_1.Scope.DEFAULT }),
    __param(0, typeorm_1.InjectRepository(service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map