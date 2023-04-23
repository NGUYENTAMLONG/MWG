import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class SubjectIdParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subjectId: number;
}

export class QueriesDto {
  @ApiPropertyOptional()
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
}
