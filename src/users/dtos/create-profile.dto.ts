import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsArray()
  scope: string;
}
