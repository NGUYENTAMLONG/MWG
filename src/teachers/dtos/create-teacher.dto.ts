import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ description: 'Teacher name', example: 'Nguyen Van A' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Title of teacher',
    example: 'Excellent teacher',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Expertise of teacher',
    example: 'English, Math',
  })
  @IsString()
  expertise: string;

  @ApiPropertyOptional({
    description: 'Achievements',
    isArray: true,
  })
  @IsArray()
  achievements: string[];

  @ApiPropertyOptional({
    description: 'metadata',
    // example: 'Metadata for the question',
  })
  @IsJSON({})
  metadata: object;
}
