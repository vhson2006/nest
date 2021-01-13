import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from '../entities/home.entity';
import { Connection, Repository } from 'typeorm';
import { UpdateHomeDto } from './dto/update-home.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private readonly homeRepository: Repository<Home>,
    private readonly connection: Connection,
  ) {}

  async getHomeByCode(code: string): Promise<Home> {
    return await this.connection.manager
      .createQueryBuilder()
      .select(
        'h.id, h.jumbotronTitle, h.mainTitle, h.mainParagraph, h.sideParagraph, h.subTitle, h.subParagraph',
      )
      .addSelect("string_agg(concat(r.position, ':', i.url), ', ') AS url")
      .from(Home, 'h')
      .innerJoin('account', 'a', 'h.accountId = a.id')
      .innerJoin('home_image', 'r', 'r.accountId = a.id')
      .innerJoin('image', 'i', 'r.imageId = i.id')
      .where('a.wcode = :wcode', { wcode: code })
      .groupBy(
        'h.id, h.jumbotronTitle, h.mainTitle, h.mainParagraph, h.sideParagraph, h.subTitle, h.subParagraph',
      )
      .getRawOne();
  }

  async update(id: string, updateHomeDto: UpdateHomeDto) {
    const home = await this.homeRepository.findOne({
      where: {
        accountId: id,
      },
    });

    if (!home) {
      throw new NotFoundException(`Home #${id} not found`);
    }
    await this.connection.manager.update(Home, { id: home.id }, updateHomeDto);
    return true;
  }
}
