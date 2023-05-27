import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { FeedbackTypes } from '../constants/feedback.constant';

export class BaseExamDto {
  @ApiProperty({ description: 'message', example: 'feedback message' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({
    description: 'Feedback Type',
    example: 'exam feedback'
  })
  @IsEnum(FeedbackTypes)
  type: FeedbackTypes;

  @ApiPropertyOptional({
    description: 'Question Id',
    type:'number',
    example: 1,
  })
  @IsNumber()
  questionId?: number;
  
  @ApiPropertyOptional({
    description: 'Exam Id',
    example: 1,
    type:'number',
  })
  @IsNumber()
  examId?: number;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
  @IsArray()
  feedbackImages: string[];
}
export class CreateFeedbackDto extends BaseExamDto {}
export class UpdateFeedbackDto extends BaseExamDto {}
