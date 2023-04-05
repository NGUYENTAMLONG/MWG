import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsNumberString,
} from 'class-validator';

export class QueryParamDto {
  @ApiPropertyOptional()
  @IsOptional()
  page: number;

  @ApiPropertyOptional()
  @IsOptional()
  pageSize: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sortBy: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEnum(['desc', 'asc'])
  sortOrder: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search: string;
}

export class ParamIdDto {
  @IsNotEmpty()
  @IsNumberString()
  id: string;
}
