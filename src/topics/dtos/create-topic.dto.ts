import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BaseTopicDto {
  // @ApiProperty({ description: 'tid', example: 't01' })
  // @IsString()
  // @IsNotEmpty()
  // tId: string;

  @ApiProperty({ description: 'topic name', example: 'family' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'topic name', example: 'family' })
  @IsString()
  @IsNotEmpty()
  description: string;

  // @ApiPropertyOptional({
  //   description: 'topic thumbnail',
  //   example: '/public/images/thumbnail-default.jpg',
  // })
  // @IsString()
  // @IsNotEmpty()
  // thumbnail: string;
}
export class CreateTopicDto extends BaseTopicDto {}
export class UpdateTopicDto extends BaseTopicDto {}
