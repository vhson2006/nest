import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Connection, Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { IMAGE_TYPE } from './image.constants';
import { Image } from '../entities/image.entity';
import { Account } from '../entities/account.entity';
import { Service } from '../entities/service.entity';
import { HomeImage } from '../entities/homeImage.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Processor('image')
export class ImageProcessor {
  private readonly logger = new Logger(ImageProcessor.name);
  constructor(
    private readonly connection: Connection,
    private readonly configSevice: ConfigService,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(HomeImage)
    private readonly homeImageRepository: Repository<HomeImage>,
  ) {}

  @Process('upload')
  async handleUpload(job: Job) {
    this.logger.debug('Start upload image...');
    const url = await this.uploadImage(job.data);
    switch (job.data.type) {
      case IMAGE_TYPE.AVATAR:
        await this.updateAvatar(
          url,
          job.data.type,
          job.data.userId,
          job.data.original,
        );
        break;
      case IMAGE_TYPE.CONTACT_US:
        await this.updateContactUsImage(
          url,
          job.data.type,
          job.data.userId,
          job.data.original,
        );
        break;
      case IMAGE_TYPE.SERVICE:
        await this.updateServiceImage(
          url,
          job.data.type,
          job.data.userId,
          job.data.original,
        );
        break;
      case IMAGE_TYPE.HOME_1:
        await this.updateHomeImage(
          url,
          job.data.type,
          job.data.userId,
          job.data.original,
          1,
        );
        break;
      case IMAGE_TYPE.HOME_2:
        await this.updateHomeImage(
          url,
          job.data.type,
          job.data.userId,
          job.data.original,
          2,
        );
        break;
      case IMAGE_TYPE.HOME_3:
        await this.updateHomeImage(
          url,
          job.data.type,
          job.data.userId,
          job.data.original,
          3,
        );
        break;
      case IMAGE_TYPE.HOME_4:
        await this.updateHomeImage(
          url,
          job.data.type,
          job.data.userId,
          job.data.original,
          4,
        );
        break;
      default:
        break;
    }
    this.logger.debug('upload image completed...');
  }

  async uploadImage(fileInfo) {
    cloudinary.config({
      cloud_name: this.configSevice.get('cloudinary.name'),
      api_key: this.configSevice.get('cloudinary.apiKey'),
      api_secret: this.configSevice.get('cloudinary.apiSecret'),
    });
    const data = await cloudinary.uploader.upload(
      fileInfo.path,
      { tags: fileInfo.type },
      function (err) {
        if (err) {
          console.warn(err);
        }
      },
    );
    return data.secure_url;
  }

  async updateAvatar(
    url: string,
    type: string,
    userId: string,
    original: string,
  ) {
    try {
      const image = new Image();
      image.original = original;
      image.type = type;
      image.url = url;
      await this.connection.manager.save(image);
      await this.connection.manager.update(
        Account,
        { id: userId },
        { avatar: image.id },
      );
    } catch (e) {
      console.log(e);
    }
  }
  async updateContactUsImage(
    url: string,
    type: string,
    userId: string,
    original: string,
  ) {
    const image = new Image();
    image.original = original;
    image.type = type;
    image.url = url;
    await this.connection.manager.save(image);
    await this.connection.manager.update(
      Account,
      { id: userId },
      { contactUsImage: image.id },
    );
  }
  async updateServiceImage(
    url: string,
    type: string,
    userId: string,
    original: string,
  ) {
    const image = new Image();
    image.original = original;
    image.type = type;
    image.url = url;
    await this.connection.manager.save(image);

    const service = await this.serviceRepository.findOne({
      where: {
        accountId: userId,
      },
    });
    await this.connection.manager.update(
      Service,
      { id: service.id },
      { serviceImage: image.id },
    );
  }
  async updateHomeImage(
    url: string,
    type: string,
    userId: string,
    original: string,
    position: number,
  ) {
    const image = new Image();
    image.original = original;
    image.type = type;
    image.url = url;
    await this.connection.manager.save(image);
    const homeImage = await this.homeImageRepository.findOne({
      where: {
        accountId: userId,
        position: position,
      },
    });

    if (homeImage) {
      await this.connection.manager.update(
        HomeImage,
        { id: homeImage.id },
        { imageId: image.id },
      );
    } else {
      const newImage = new HomeImage();
      newImage.accountId = userId;
      newImage.position = position.toString();
      newImage.imageId = image.id;
      await this.connection.manager.save(newImage);
    }
  }
}
