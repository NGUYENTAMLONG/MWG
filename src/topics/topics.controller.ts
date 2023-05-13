import {
  Controller,
  Get,
  Query,
  UseGuards,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TopicDetailResponseSchema } from './interfaces/topic.interface';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { Auth } from 'src/auth/auth.decorator';
import { PermissionType } from 'src/permissions/constants/permission.constant';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'helpers/file.helper';
import { imageFileFilter } from 'src/validators/validation-file';

@ApiTags('topics')
@Controller({ version: ['1'], path: 'topics' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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

  @Post('')
  @Auth(PermissionType.CREATE_TOPIC)
  @ApiOperation({ summary: 'Admin Creates Topic' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './src/assets/thumbnail/topics',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiBody({
    description: 'Data create infor topic',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'name of topic',
          example: 'education',
        },
        description: {
          type: 'string',
          description: 'description of topic',
          example: 'description of topic',
        },
        thumbnail: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse(swaggerSchemaRef(TopicDetailResponseSchema))
  @ApiBadRequestResponse(swaggerSchemaRef(BadRequestEntity))
  @ApiUnauthorizedResponse(swaggerSchemaRef(UnauthorizedEntity))
  @ApiInternalServerErrorResponse(swaggerSchemaRef(InternalServerErrorEntity))
  createUser(
    @Body() payload: CreateTopicDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ): Promise<any> {
    return this.topicService.createTopic(payload, thumbnail);
  }
}
