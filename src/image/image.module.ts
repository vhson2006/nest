import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { BullModule } from '@nestjs/bull';
import { ImageProcessor } from './image.processor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';
import { HomeImage } from '../entities/homeImage.entity';
import { Image } from '../entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, HomeImage, Image]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get('global.temp'),
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'image',
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService, ImageProcessor],
  exports: [ImageService],
})
export class ImageModule {}
