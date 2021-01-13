import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'The title of a product.' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'The description of a product.' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'The tags of a product.' })
  @IsString()
  readonly tags: string;
}
