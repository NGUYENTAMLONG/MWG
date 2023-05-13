import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class QuestionIdParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  questionId: number;
}

export class QueriesDto {
  @ApiPropertyOptional()
  @ApiProperty()
  @IsOptional()
  @IsString()
  question: string;

  @ApiPropertyOptional()
  @ApiProperty()
  @IsOptional()
  @IsString()
  explain: string;
}
