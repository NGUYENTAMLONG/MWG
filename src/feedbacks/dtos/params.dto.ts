import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class FeedbackIdParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fId: number;
}
