import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateOneAnswerDto {
  @ApiProperty({ description: 'content of answer', example: 'my answer' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'true/false', example: 'true' })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  correct: boolean;

  @ApiProperty({
    description: 'metadata',
    // example: 'Metadata for the answer',
  })
  @IsOptional()
  @IsJSON()
  metadata: JSON;

  @ApiProperty({
    description: 'question id',
    example: 2,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  questionId: number;
}
