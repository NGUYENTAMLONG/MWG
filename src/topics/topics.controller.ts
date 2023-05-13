import { Controller, Get, Query } from '@nestjs/common';
import { TopicsService } from './topics.service';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  swaggerSchemaArr,
  swaggerSchemaRef,
} from 'src/common/utils/swagger.util';
import { TopicEntity } from './entities/topic.entity';
import {
  BadRequestEntity,
  InternalServerErrorEntity,
  NotFoundEntity,
  UnauthorizedEntity,
} from 'src/common/constants/app/app.object';
import { QueryParamDto } from './dtos/query-param.dto';

@ApiTags('topics')
@Controller({ version: ['1'], path: 'topics' })
export class TopicsController {
  constructor(private readonly topicService: TopicsService) {}

  @Get('/')
  @ApiExtraModels(TopicEntity)
  @ApiOkResponse(swaggerSchemaArr(TopicEntity))
  @ApiBadRequestResponse(swaggerSchemaRef(BadRequestEntity))
  @ApiNotFoundResponse(swaggerSchemaRef(NotFoundEntity))
  @ApiUnauthorizedResponse(swaggerSchemaRef(UnauthorizedEntity))
  @ApiInternalServerErrorResponse(swaggerSchemaRef(InternalServerErrorEntity))
  @ApiOperation({ summary: 'Get List (Topic)' })
  getList(@Query() queries: QueryParamDto): Promise<any> {
    return this.topicService.getTopicList(queries);
  }
}
