import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEmpty,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateQuestionDto {
  @ApiPropertyOptional({ description: 'qId', example: 'q01' })
  @IsString()
  qId: string;

  @ApiProperty({ description: 'question', example: 'What does the Fox say?' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiPropertyOptional({
    description: 'explain',
    example: 'Explanation for the question',
  })
  @IsString()
  explain: string;

  @ApiPropertyOptional({
    description: 'note',
    example: 'Note for the question',
  })
  @IsString()
  note: string;

  @ApiPropertyOptional({
    description: 'suggest',
    example: 'Suggest for the question',
  })
  @IsString()
  suggest: string;

  @ApiPropertyOptional({
    description: 'metadata',
    // example: 'Metadata for the question',
  })
  @IsJSON()
  metadata: JSON;

  @ApiPropertyOptional({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;

  // @ApiPropertyOptional({
  //   description: 'aswer',
  //   example: 'Answer of the question',
  // })
  // @IsArray()
  // answer: object;
}
// export class CreateQuestionDto extends BaseQuestionDto {}
// export class UpdateQuestionDto extends BaseQuestionDto {}
