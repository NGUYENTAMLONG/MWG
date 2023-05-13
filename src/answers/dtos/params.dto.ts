import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class AnswerIdParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  answerId: number;
}

export class QueriesDto {
  @ApiPropertyOptional()
  @ApiProperty()
  @IsOptional()
  @IsString()
  content: string;
}
