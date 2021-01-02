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
exports.ServicesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const protocol_decorator_1 = require("../common/decorators/protocol.decorator");
const public_decorator_1 = require("../common/decorators/public.decorator");
const parse_int_pipe_1 = require("../common/pipes/parse-int.pipe");
const services_service_1 = require("./services.service");
const create_service_dto_1 = require("./dto/create-service.dto");
const update_service_dto_1 = require("./dto/update-service.dto");
let ServicesController = class ServicesController {
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    async findAll(protocol, paginationQuery) {
        return this.servicesService.findAll(paginationQuery);
    }
    findOne(id) {
        const service = this.servicesService.findOne(id);
        if (!service) {
            throw new common_1.HttpException(`Services #${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return service;
    }
    create(createServiceDto) {
        return this.servicesService.create(createServiceDto);
    }
    update(id, serviceCoffeeDto) {
        return this.servicesService.update(id, serviceCoffeeDto);
    }
    remove(id) {
        return this.servicesService.remove(id);
    }
};
__decorate([
    swagger_1.ApiForbiddenResponse({ description: 'Forbidden.' }),
    public_decorator_1.Public(),
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/service.entity").Service] }),
    __param(0, protocol_decorator_1.Protocol('https')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/service.entity").Service }),
    __param(0, common_1.Param('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: require("../entities/service.entity").Service }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "create", null);
__decorate([
    common_1.Patch(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/service.entity").Service }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_service_dto_1.UpdateServiceDto]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/service.entity").Service }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "remove", null);
ServicesController = __decorate([
    swagger_1.ApiTags('services'),
    common_1.Controller('services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
exports.ServicesController = ServicesController;
//# sourceMappingURL=services.controller.js.map