import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findAll(protocol: string, paginationQuery: any): Promise<import("../entities/service.entity").Service[]>;
    findOne(id: string): Promise<import("../entities/service.entity").Service>;
    create(createServiceDto: CreateServiceDto): Promise<import("../entities/service.entity").Service>;
    update(id: string, serviceCoffeeDto: UpdateServiceDto): Promise<import("../entities/service.entity").Service>;
    remove(id: string): Promise<import("../entities/service.entity").Service>;
}
