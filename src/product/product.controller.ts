import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/entities/product.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Request() req, @Body() createProductDto: CreateProductDto) {
    return await this.productService.create(req.user.id, createProductDto);
  }

  @Public()
  @Get(':code')
  async findAll(@Param('code') code: string): Promise<Product[]> {
    return await this.productService.findAll(code);
  }

  @Public()
  @Get('/:code/:id')
  async findOne(@Param('code') code: string, @Param('id') id: string) {
    return await this.productService.findOne(code, id);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(req.user.id, id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return await this.productService.remove(req.user.id, id);
  }
}
