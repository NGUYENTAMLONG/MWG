import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('app')
@Controller({ version: ['1'], path: 'app' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('index')
  // @Render('index')
  root(@Res() res: Response) {
    return res.render('index', { message: this.appService.getViewname() });
  }
}
