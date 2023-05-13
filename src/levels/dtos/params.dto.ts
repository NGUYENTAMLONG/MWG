import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class LevelIdParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  levelId: number;
}

export class QueriesDto {
  @ApiPropertyOptional()
  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;
}
