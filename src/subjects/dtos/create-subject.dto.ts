import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsJSON, IsNumberString, IsString } from 'class-validator';

export class TopicIdDto {
  @ApiProperty()
  @IsNumberString()
  topicId: number;
}
export class CreateSubjectDto {
  @ApiPropertyOptional({
    description: 'Subject name',
    example: 'Name of subject',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'description',
    example: 'Subject description',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'metadata',
    // example: 'Metadata for the question',
  })
  @IsJSON({})
  metadata: JSON;

  @ApiPropertyOptional({
    description: 'Levels',
    isArray: true,
  })
  @IsArray()
  levels: number[];
}
// export class CreateSubjectDto extends BaseSubjectDto {}
// export class UpdateSubjectDto extends BaseSubjectDto {}
