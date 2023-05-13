import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QueriesDto } from './dtos/params.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { CreateOneAnswerDto } from './dtos/create-answer.dto';
import { QueryParamDto } from './dtos/query-param.dto';
import { UpdateOneAnswerDto } from './dtos/update-answer.dto';
import { AnswerEntity } from './entities/answer.entity';

@ApiTags('answers')
@Controller({ version: ['1'], path: 'answers' })
export class AnswersController {
  constructor(private readonly answerService: AnswersService) {}

  @Get('')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User get list answers' })
  getList(@Query() queries: QueryParamDto): Promise<any> {
    return this.answerService.getAnswerList(queries);
  }

  @Post('/create-one')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User Creates one answer' })
  createOne(@Body() payloadAnswer: CreateOneAnswerDto): Promise<AnswerEntity> {
    return this.answerService.createOneAnswer(payloadAnswer);
  }

  @Patch('/:id')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User Restores one answer' })
  restoreOne(@Param('id') id: string): Promise<any> {
    return this.answerService.restoreOneAnswer(Number(id));
  }

  @Patch('/update-one/:id')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User Updates one answer' })
  updateOne(
    @Param('id') id: string,
    @Body() payloadAnswer: UpdateOneAnswerDto,
  ): Promise<any> {
    return this.answerService.updateOneAnswer(Number(id), payloadAnswer);
  }

  @Delete('/:id')
  // @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin/User SoftDeletes one answer' })
  softDeleteOne(@Param('id') id: string): Promise<any> {
    return this.answerService.softDeleteOneAnswer(Number(id));
  }
}
