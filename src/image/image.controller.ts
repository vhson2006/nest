import {
  Controller,
  Post,
  Request,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file,
    @Body('type') type: string,
    @Request() req,
  ): Promise<boolean> {
    return await this.imageService.uploadImageByType(
      type,
      file.path,
      file.originalname,
      req.user.id,
    );
  }
}
