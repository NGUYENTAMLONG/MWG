import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiPropertyOptional({
    description: 'username',
    example: 'usernameadmin',
  })
  @IsString()
  username: string;

  // @ApiPropertyOptional({
  //   description: 'email',
  //   example: 'tamlong@gmail.com',
  // })
  // @IsEmail()
  // @IsString()
  // email: string;

  @ApiProperty({
    description: 'password',
    example: 'admin123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
