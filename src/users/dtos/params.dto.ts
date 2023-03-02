import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UserIdParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: number;
}
export class QueriesDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
}
