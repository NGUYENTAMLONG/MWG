import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QueriesDto } from './dtos/params.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionEntity } from './entities/question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../../helpers/file.helper';
import { imageFileFilter } from '../../src/validators/validation-file';
import { QueryParamDto } from './dtos/query-param.dto';
import {
  AnswerDto,
  CreateAnswersOfQuestionDto,
} from './dtos/create-answers-of-question.dto';

@ApiTags('questions')
@Controller({ version: ['1'], path: 'questions' })
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get('')
  getList(@Query() queries: QueryParamDto): Promise<QuestionEntity> {
    return this.questionService.getQuestionList(queries);
  }

  @Get('/list-include-answers')
  getListIncludeAnswers(
    @Query() queries: QueryParamDto,
  ): Promise<QuestionEntity> {
    return this.questionService.getQuestionListIncludeAnswers(queries);
  }

  @Post('')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User Creates question' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/assets/images/questions',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  createOne(
    @Body() payload: CreateQuestionDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<QuestionEntity> {
    return this.questionService.createQuestion(payload, image);
  }

  // @Post('/with-answers')
  // // @Auth(PermissionType.CREATE_USER)

  @Delete('/:id')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User SoftDeletes one question' })
  softDeleteOne(@Param('id') id: string): Promise<any> {
    return this.questionService.softDeleteOneQuestion(Number(id));
  }

  @Patch('/:id')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User Restores one question' })
  restoreOne(@Param('id') id: string): Promise<any> {
    return this.questionService.restoreOneQuestion(Number(id));
  }
}
