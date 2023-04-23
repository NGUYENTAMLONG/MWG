import { Controller, Get, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QueriesDto } from './dtos/params.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('questions')
@Controller({ version: ['1'], path: 'questions' })
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get('')
  getList(@Query() queries: QueriesDto): Promise<any> {
    return this.questionService.getQuestionList(queries);
  }
}
