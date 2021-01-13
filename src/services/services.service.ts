import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Connection, Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from '../entities/service.entity';

@Injectable({ scope: Scope.DEFAULT })
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly connection: Connection,
  ) {}

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepository.findOne({
      where: {
        accountId: id,
      },
    });

    if (!service) {
      throw new NotFoundException(`Service #${id} not found`);
    }
    await this.connection.manager.update(
      Service,
      { id: service.id },
      updateServiceDto,
    );
    return true;
  }

  async getServiceByCode(code: string): Promise<Service[]> {
    return await this.connection.manager
      .createQueryBuilder()
      .select('s.id, s.mainTitle, s.jumbotronTitle, i.url')
      .from(Service, 's')
      .innerJoin('account', 'a', 's.accountId = a.id')
      .innerJoin('image', 'i', 's.serviceImage = i.id')
      .where('a.wcode = :wcode', { wcode: code })
      .getRawMany();
  }
}
