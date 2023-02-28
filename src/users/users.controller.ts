import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueriesDto, UserIdParamDto } from './dtos/params.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  createUser(@Body() payload: CreateUserDto): Promise<any> {
    return this.userService.createUser(payload);
  }

  @Get('')
  getList(): Promise<any> {
    return this.userService.getUserList();
  }

  @Get('/get-by-username')
  findOneByUsername(@Query() queries) {
    const { username } = queries;
    return this.userService.findOneByUsername(username);
  }

  @Get('/:userId')
  findOneById(@Param() params: UserIdParamDto): Promise<any> {
    const { userId } = params;
    return this.userService.findOneById(userId);
  }
}
