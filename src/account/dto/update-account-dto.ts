import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty({ description: 'email' })
  @Allow()
  readonly email: string;

  @ApiProperty({ description: 'name' })
  @Allow()
  readonly name: string;

  @ApiProperty({ description: 'phone' })
  @Allow()
  readonly phone: string;

  @ApiProperty({ description: 'address' })
  @Allow()
  readonly address: string;

  @ApiProperty({ description: 'aboutUs' })
  @Allow()
  readonly aboutUs: string;

  @ApiProperty({ description: 'wcode' })
  @Allow()
  readonly wcode: string;

  @ApiProperty({ description: 'avatar' })
  @Allow()
  readonly avatar: string;

  @ApiProperty({ description: 'background' })
  @Allow()
  readonly background: string;

  @ApiProperty({ description: 'contactUsImage' })
  @Allow()
  readonly contactUsImage: string;
}
