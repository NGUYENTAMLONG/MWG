import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

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
