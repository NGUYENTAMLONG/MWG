import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class ExamIdParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  eId: number;
}

export class QueryByTitleDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title: string;
}
