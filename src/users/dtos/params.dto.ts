import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UserIdParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: number;
}
export class QueriesDto {
  @ApiPropertyOptional()
  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string;

  @ApiPropertyOptional()
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
}
export class QueryByUsernameDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string;
}
