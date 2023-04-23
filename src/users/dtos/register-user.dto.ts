import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BaseUserRegisterDto {
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
}
export class RegisterUserDto extends BaseUserRegisterDto {}
