import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ description: 'The title of a service.' })
  @IsString()
  readonly jumbotronTitle: string;

  @ApiProperty({ description: 'The description of a service.' })
  @IsString()
  readonly mainTitle: string;
}
