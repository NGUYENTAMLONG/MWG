<<<<<<< HEAD
import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags,ApiConsumes,ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
=======
import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
>>>>>>> a9d76dfdeeb80c5dff1042ae6974e1c0c66adcad

@ApiTags('app')
@Controller({ version: ['1'], path: 'app' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  getHello(): string {
    return this.appService.getHello();
  }
<<<<<<< HEAD
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file) {
    console.log(file);
    return await this.appService.upload(file);
=======

  @Get('index')
  // @Render('index')
  root(@Res() res: Response) {
    return res.render('index', { message: this.appService.getViewname() });
>>>>>>> a9d76dfdeeb80c5dff1042ae6974e1c0c66adcad
  }
}
