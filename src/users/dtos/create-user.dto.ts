import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserRoleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class BaseUserDto {
  @ApiProperty({ description: 'username', example: 'username01' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'email', example: 'user01@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'password', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'password', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiPropertyOptional({
    description: 'metadata',
    // example: 'Metadata for the question',
  })
  @IsJSON()
  metadata: JSON;
}
export class CreateUserDto extends BaseUserDto {}
export class UpdateUserDto extends BaseUserDto {}
