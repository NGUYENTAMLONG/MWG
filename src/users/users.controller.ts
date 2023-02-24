import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  getList(): Promise<any> {
    return this.userService.getUserList();
  }

  @Post('')
  createUser(@Body() payload: CreateUserDto): Promise<any> {
    return this.userService.createUser(payload);
  }
}
