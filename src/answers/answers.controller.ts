import { Controller, Get, Query } from '@nestjs/common';
import { QueriesDto } from './dtos/params.dto';
import { ApiTags } from '@nestjs/swagger';
import { AnswersService } from './answers.service';

@ApiTags('answers')
@Controller({ version: ['1'], path: 'answers' })
export class AnswersController {
  constructor(private readonly answerService: AnswersService) {}

  @Get('')
  getList(@Query() queries: QueriesDto): Promise<any> {
    return this.answerService.getAnswerList(queries);
  }
}
