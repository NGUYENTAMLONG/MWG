import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryByUsernameDto, UserIdParamDto } from './dtos/params.dto';
import { UsersService } from './users.service';
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
import { UserDetailResponseSchema } from './interfaces/user.interface';
import {
  swaggerSchemaArr,
  swaggerSchemaRef,
} from 'src/common/utils/swagger.util';
import {
  BadRequestEntity,
  InternalServerErrorEntity,
  NotFoundEntity,
  UnauthorizedEntity,
} from 'src/common/constants/app/app.object';
import { QueryParamDto } from './dtos/query-param.dto';
import { Auth } from 'src/auth/auth.decorator';
import { PermissionType } from 'src/permissions/constants/permission.constant';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller({ version: ['1'], path: 'users' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin Creates User' })
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Data create infor user',
    type: CreateUserDto,
  })
  @ApiOkResponse(swaggerSchemaRef(UserDetailResponseSchema))
  @ApiBadRequestResponse(swaggerSchemaRef(BadRequestEntity))
  @ApiUnauthorizedResponse(swaggerSchemaRef(UnauthorizedEntity))
  @ApiInternalServerErrorResponse(swaggerSchemaRef(InternalServerErrorEntity))
  createUser(@Body() payload: CreateUserDto): Promise<any> {
    return this.userService.createUser(payload);
  }

  @Get('')
  // @Auth(PermissionType.READ_USER)
  @ApiExtraModels(UserDetailResponseSchema)
  @ApiOkResponse(swaggerSchemaArr(UserDetailResponseSchema))
  @ApiBadRequestResponse(swaggerSchemaRef(BadRequestEntity))
  @ApiNotFoundResponse(swaggerSchemaRef(NotFoundEntity))
  @ApiUnauthorizedResponse(swaggerSchemaRef(UnauthorizedEntity))
  @ApiInternalServerErrorResponse(swaggerSchemaRef(InternalServerErrorEntity))
  @ApiOperation({ summary: 'Get List (User)' })
  getList(@Query() queries: QueryParamDto): Promise<any> {
    return this.userService.getUserList(queries);
  }

  @Get('/get-by-username')
  @ApiOperation({ summary: 'Get User by Username' })
  @ApiExtraModels(UserDetailResponseSchema)
  @ApiOkResponse(swaggerSchemaRef(UserDetailResponseSchema))
  @ApiBadRequestResponse(swaggerSchemaRef(BadRequestEntity))
  @ApiNotFoundResponse(swaggerSchemaRef(NotFoundEntity))
  @ApiUnauthorizedResponse(swaggerSchemaRef(UnauthorizedEntity))
  @ApiInternalServerErrorResponse(swaggerSchemaRef(InternalServerErrorEntity))
  findOneByUsername(@Query() queries: QueryByUsernameDto) {
    const { username } = queries;
    return this.userService.findOneByUsername(username);
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'Get User by Id' })
  @ApiOkResponse(swaggerSchemaRef(UserDetailResponseSchema))
  @ApiBadRequestResponse(swaggerSchemaRef(BadRequestEntity))
  @ApiNotFoundResponse(swaggerSchemaRef(NotFoundEntity))
  @ApiUnauthorizedResponse(swaggerSchemaRef(UnauthorizedEntity))
  @ApiInternalServerErrorResponse(swaggerSchemaRef(InternalServerErrorEntity))
  findOneById(@Param() params: UserIdParamDto): Promise<any> {
    const { userId } = params;
    return this.userService.findOneById(userId);
  }
}
