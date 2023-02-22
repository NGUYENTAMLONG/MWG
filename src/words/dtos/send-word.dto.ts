import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { IsNotEmpty } from 'class-validator/types/decorator/decorators';

export class SendWordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(1)
  word: string;
}
