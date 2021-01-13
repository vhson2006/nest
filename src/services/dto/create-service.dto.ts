import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ description: 'The title of a service.' })
  @IsString()
  @MinLength(10, {
    message: 'Title is too short',
  })
  readonly jumbotronTitle: string;

  @ApiProperty({ description: 'The description of a service.' })
  @IsString()
  @MinLength(10, {
    message: 'Title is too short',
  })
  readonly mainTitle: string;
}
