import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOneQuestionDto {
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
}
