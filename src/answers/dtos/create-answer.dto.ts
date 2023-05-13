import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBoolean,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOneAnswerDto {
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

export class AnswerDto {
  // @ApiPropertyOptional({ description: 'aId', example: 'a01' })
  @IsString()
  aId: string;

  // @ApiProperty({ description: 'content of answer', example: 'my answer' })
  @IsString()
  @IsNotEmpty()
  content: string;

  // @ApiProperty({ description: 'true/false', example: 'true' })
  @IsBoolean()
  @IsNotEmpty()
  correct: boolean;
}

export class CreateAnswersOfQuestionDto {
  @ApiProperty({ type: [AnswerDto] })
  @Type(() => AnswerDto)
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  answers: AnswerDto[];
}
