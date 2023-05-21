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
  ApiParam,
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
import { CreateUserTeacherDto } from './dtos/create-teacher-account.dto';
import { UserInRequest } from 'src/common/decorators/user-in-request.decorator';
import { UserEntity } from './entities/user.entity';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { ProfileEntity } from './entities/profile.entity';

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
  createUser(
    @UserInRequest() user: UserEntity,
    @Body() payload: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.createUser(user, payload);
  }

  @Post('/create-profile')
  @Auth(PermissionType.CREATE_USER)
  @ApiOperation({ summary: 'Admin Creates User Profile' })
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Data create user profile',
    type: CreateProfileDto,
  })
  @ApiOkResponse(swaggerSchemaRef(UserDetailResponseSchema))
  @ApiBadRequestResponse(swaggerSchemaRef(BadRequestEntity))
  @ApiUnauthorizedResponse(swaggerSchemaRef(UnauthorizedEntity))
  @ApiInternalServerErrorResponse(swaggerSchemaRef(InternalServerErrorEntity))
  createUserProfile(
    @UserInRequest() user: UserEntity,
    @Body() payload: CreateProfileDto,
  ): Promise<ProfileEntity> {
    return this.userService.createProfile(user, payload);
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

  @Get('/get-with-creater/:id')
  @ApiOperation({ summary: 'Get User with Creater' })
  @ApiExtraModels(UserDetailResponseSchema)
  @ApiOkResponse(swaggerSchemaRef(UserDetailResponseSchema))
  @ApiBadRequestResponse(swaggerSchemaRef(BadRequestEntity))
  @ApiNotFoundResponse(swaggerSchemaRef(NotFoundEntity))
  @ApiUnauthorizedResponse(swaggerSchemaRef(UnauthorizedEntity))
  @ApiInternalServerErrorResponse(swaggerSchemaRef(InternalServerErrorEntity))
  // @ApiParam({ name: 'id', type: 'number' })
  findOneWithCreater(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.getUserWithCreater(id);
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

  @Post('/create-teacher-account')
  @Auth(PermissionType.CREATE_TEACHER)
  @ApiOperation({ summary: 'Admin Creates Teacher Account' })
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Data create teacher account',
    type: CreateUserTeacherDto,
  })
  @ApiBadRequestResponse(swaggerSchemaRef(BadRequestEntity))
  @ApiUnauthorizedResponse(swaggerSchemaRef(UnauthorizedEntity))
  @ApiInternalServerErrorResponse(swaggerSchemaRef(InternalServerErrorEntity))
  createTeacher(
    @UserInRequest() user: UserEntity,
    @Body() payload: CreateUserTeacherDto,
  ): Promise<any> {
    return this.userService.createUserTeacher(user, payload);
  }
}
