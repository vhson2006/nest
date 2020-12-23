import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from '../entities/service.entity';

@Injectable({ scope: Scope.DEFAULT })
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.serviceRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const service = await this.serviceRepository.findOne(id);
    if (!service) {
      throw new NotFoundException(`Service #${id} not found`);
    }
    return service;
  }

  async create(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create({
      ...createServiceDto,
    });
    return this.serviceRepository.save(service);
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepository.preload({
      ...updateServiceDto,
    });
    if (!service) {
      throw new NotFoundException(`Service #${id} not found`);
    }
    return this.serviceRepository.save(service);
  }

  async remove(id: string) {
    const service = await this.findOne(id);
    return this.serviceRepository.remove(service);
  }
}
