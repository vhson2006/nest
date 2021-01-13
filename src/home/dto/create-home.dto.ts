import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateHomeDto {
  @ApiProperty({ description: 'The jumbotronTitle of a home.' })
  @IsString()
  @MinLength(10, {
    message: 'jumbotronTitle is too short',
  })
  readonly jumbotronTitle: string;

  @ApiProperty({ description: 'The mainTitle of a home.' })
  @IsString()
  @MinLength(10, {
    message: 'mainTitle is too short',
  })
  readonly mainTitle: string;

  @ApiProperty({ description: 'The mainParagraph of a home.' })
  @IsString()
  @MinLength(10, {
    message: 'mainParagraph is too short',
  })
  readonly mainParagraph: string;

  @ApiProperty({ description: 'The sideParagraph of a home.' })
  @IsString()
  @MinLength(10, {
    message: 'sideParagraph is too short',
  })
  readonly sideParagraph: string;

  @ApiProperty({ description: 'The subTitle of a home.' })
  @IsString()
  @MinLength(10, {
    message: 'subTitle is too short',
  })
  readonly subTitle: string;

  @ApiProperty({ description: 'The subParagraph of a home.' })
  @IsString()
  @MinLength(10, {
    message: 'subParagraph is too short',
  })
  readonly subParagraph: string;
}
