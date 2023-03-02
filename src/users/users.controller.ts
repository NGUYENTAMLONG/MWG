import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
} from '@nestjs/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName } from 'helpers/file.helper';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/validators/validation-file';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryParamDto } from './dtos/query-param.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  getList(@Query() query: QueryParamDto): Promise<any> {
    return this.userService.getUserList(query);
  }

  @Post('')
  createUser(@Body() payload: CreateUserDto): Promise<any> {
    return this.userService.createUser(payload);
  }

  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './src/assets/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() payload,
  ) {
    const { userId } = payload;
    const filename = file.filename;
    return this.userService.uploadAvatar(userId, filename);
  }

  @Get('/profile/:userId')
  getProfile(@Param() params): Promise<any> {
    const { userId } = params;
    console.log(userId);
    return this.userService.getProfile(userId);
  }
}
