import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserTeacherDto {
  @ApiProperty({ description: 'Username', example: 'username01' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Email', example: 'user01@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    description: 'metadata',
    // example: 'Metadata for the question',
  })
  @IsJSON()
  metadataUser: object;

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
  @IsString({ each: true })
  achievements: string[];

  @ApiPropertyOptional({
    description: 'metadata',
    // example: 'Metadata for the question',
  })
  @IsJSON({})
  metadataTeacher: object;
}
