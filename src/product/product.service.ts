import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Connection, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly connection: Connection,
  ) {}
  async create(id: string, createProductDto: CreateProductDto) {
    const product = new Product();
    product.title = createProductDto.title;
    product.description = createProductDto.description;
    product.tags = createProductDto.tags;
    product.accountId = id;
    product.imageId = '';
    await this.connection.manager.save(product);
    return true;
  }

  async findAll(code: string) {
    return await this.connection.manager
      .createQueryBuilder()
      .select('p.id, p.title, p.description, p.tags, i.url')
      .from(Product, 'p')
      .innerJoin('account', 'a', 'p.accountId = a.id')
      .innerJoin('image', 'i', 'p.imageId = i.id')
      .where('a.wcode = :wcode', { wcode: code })
      .getRawMany();
  }

  async findOne(code: string, id: string) {
    return await this.connection.manager
      .createQueryBuilder()
      .select('p.id, p.title, p.description, p.tags, i.url')
      .from(Product, 'p')
      .innerJoin('account', 'a', 'p.accountId = a.id')
      .innerJoin('image', 'i', 'p.imageId = i.id')
      .where('a.wcode = :wcode', { wcode: code })
      .andWhere('p.id = :id', { id: id })
      .getRawOne();
  }

  async update(
    id: string,
    productId: string,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productRepository.findOne({
      where: {
        accountId: id,
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    await this.connection.manager.update(
      Product,
      { id: productId },
      updateProductDto,
    );
    return true;
  }

  async remove(id: string, productId: string) {
    const product = await this.productRepository.findOne({
      where: {
        accountId: id,
        id: productId,
      },
    });
    await this.connection.manager.remove(product);
    return true;
  }
}
