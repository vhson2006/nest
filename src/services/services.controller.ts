import { Body, Controller, Get, Param, Put, Request } from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from '../entities/service.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get(':code')
  @Public()
  async getHome(@Param('code') code: string): Promise<Service[]> {
    return await this.servicesService.getServiceByCode(code);
  }

  @Put()
  update(@Request() req, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(req.user.id, updateServiceDto);
  }
}
