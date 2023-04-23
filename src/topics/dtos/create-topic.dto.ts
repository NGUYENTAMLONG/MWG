import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseTopicDto {
  @ApiProperty({ description: 'tid', example: 't01' })
  @IsString()
  @IsNotEmpty()
  tid: string;

  @ApiProperty({ description: 'topic name', example: 'family' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'topic name', example: 'family' })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiPropertyOptional({
    description: 'topic thumbnail',
    example: '/public/images/thumbnail-default.jpg',
  })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;
}
export class CreateTopicDto extends BaseTopicDto {}
export class UpdateTopicDto extends BaseTopicDto {}
