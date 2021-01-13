import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ description: 'email' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  readonly password: string;
}
