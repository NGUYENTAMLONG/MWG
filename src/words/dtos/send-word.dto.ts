import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class SendWordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(1)
  word: string;
}
