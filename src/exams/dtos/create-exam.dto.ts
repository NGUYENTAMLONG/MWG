import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseExamDto {
  @ApiProperty({ description: 'eid', example: 'e01' })
  @IsString()
  @IsNotEmpty()
  eid: string;

  @ApiProperty({ description: 'title', example: 'exam 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'description', example: 'exam description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'note', example: 'note for exam' })
  @IsString()
  @IsNotEmpty()
  note: string;

  @ApiProperty({ description: 'duration', example: 'exam time' })
  @IsString()
  @IsNotEmpty()
  duration: number;
}
export class CreateUserDto extends BaseExamDto {}
export class UpdateUserDto extends BaseExamDto {}
