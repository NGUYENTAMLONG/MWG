import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class AddWordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(1)
  word: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  part_of_speech: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  example: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  meaning: string;
}
