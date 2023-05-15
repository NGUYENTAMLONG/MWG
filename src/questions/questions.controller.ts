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
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionEntity } from './entities/question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../../src/validators/validation-file';
import { QueryParamDto } from './dtos/query-param.dto';
import { UpdateOneQuestionDto } from './dtos/update-question.dto';

@ApiTags('questions')
@Controller({ version: ['1'], path: 'questions' })
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get('')
  getList(@Query() queries: QueryParamDto): Promise<QuestionEntity> {
    return this.questionService.getQuestionList(queries);
  }

  @Get('/list-include-answers')
  @ApiOperation({ summary: 'Admin/User Gets question with answer' })
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
      // storage: diskStorage({
      //   destination: './src/assets/images/questions',
      //   filename: editFileName,
      // }),
      fileFilter: imageFileFilter,
    }),
  )
  createOne(
    @Body() payload: CreateQuestionDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<QuestionEntity> {
    return this.questionService.createQuestion(payload, image);
  }

  @Patch('/:id')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User Update question' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
    }),
  )
  updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateOneQuestionDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.questionService.updateQuestion(Number(id), payload, image);
  }

  // @Post('/with-answers')
  // // @Auth(PermissionType.CREATE_USER)

  @Delete('/:id')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User SoftDeletes one question' })
  softDeleteOne(@Param('id') id: string): Promise<any> {
    return this.questionService.softDeleteOneQuestion(Number(id));
  }

  @Patch('/restore/:id')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User Restores one question' })
  restoreOne(@Param('id') id: string): Promise<any> {
    return this.questionService.restoreOneQuestion(Number(id));
  }

  @Delete('/attachment/:type/remove/:id')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User SoftDelete one attachment' })
  softDeleteAttachment(
    @Param('type') type: string,
    @Param('id') id: string,
  ): Promise<any> {
    return this.questionService.softDeleteAttachmentOfQuestion(
      type,
      Number(id),
    );
  }

  @Patch('attachment/:type/restore/:id')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User Restores one attachment' })
  restoreAttachment(
    @Param('type') type: string,
    @Param('id') id: string,
  ): Promise<any> {
    return this.questionService.restoreAttachmentOfQuestion(type, Number(id));
  }
}
