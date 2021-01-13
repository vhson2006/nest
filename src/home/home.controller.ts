import { Body, Controller, Get, Param, Request, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Home } from 'src/entities/home.entity';
import { UpdateHomeDto } from './dto/update-home.dto';
import { HomeService } from './home.service';

@ApiTags('home')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get(':code')
  @Public()
  async getHome(@Param('code') code: string): Promise<Home> {
    return await this.homeService.getHomeByCode(code);
  }

  @Put()
  update(@Request() req, @Body() updateServiceDto: UpdateHomeDto) {
    return this.homeService.update(req.user.id, updateServiceDto);
  }
}
