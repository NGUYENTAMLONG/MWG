import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'username',
    example: 'tamlongbg',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'password',
    example: '12345678',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
