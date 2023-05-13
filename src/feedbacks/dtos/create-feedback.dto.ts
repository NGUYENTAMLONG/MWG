import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseExamDto {
  @ApiProperty({ description: 'fid', example: 'f01' })
  @IsString()
  @IsNotEmpty()
  fid: string;

  @ApiProperty({ description: 'message', example: 'feedback message' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
export class CreateUserDto extends BaseExamDto {}
export class UpdateUserDto extends BaseExamDto {}
