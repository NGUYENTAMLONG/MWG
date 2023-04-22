import { Controller, Get, Query } from '@nestjs/common';
import { QueriesDto } from './dtos/params.dto';
import { ApiTags } from '@nestjs/swagger';
import { LevelsService } from './levels.service';

@ApiTags('levels')
@Controller({ version: ['1'], path: 'levels' })
export class LevelsController {
  constructor(private readonly levelService: LevelsService) {}

  @Get('')
  getList(@Query() queries: QueriesDto): Promise<any> {
    return this.levelService.getLevelList(queries);
  }
}
