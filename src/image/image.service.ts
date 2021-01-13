import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  constructor(
    @InjectQueue('image')
    private readonly imageQueue,
  ) {}

  async uploadImageByType(
    type: string,
    filePath: string,
    originalName: string,
    userId: string,
  ) {
    await this.imageQueue.add('upload', {
      type: type,
      path: filePath,
      original: originalName,
      userId: userId,
    });
    return true;
  }
}
