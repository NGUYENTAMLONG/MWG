import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class TopicIdParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  topicId: number;
}
export class QueriesDto {
  @ApiPropertyOptional()
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
export class QueryByTopicnameDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}
