import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UserIdParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uId: number;
}
export class QueriesDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}
