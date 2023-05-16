import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'helpers/file.helper';
import { csvFileFilter } from './validators/validation-file';

@ApiTags('app')
@Controller({ version: ['1'], path: 'app' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  getHello(): string {
    return this.appService.getHello();
  }

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
    return this.appService.upload(file);
  }

  @Post('upload-csv')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        csv: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('csv', {
      storage: diskStorage({
        destination: './src/assets/csv/data',
        filename: editFileName,
      }),
      fileFilter: csvFileFilter,
    }),
  )
  async uploadCSV(@UploadedFile('file') file) {
    console.log(file);
    return this.appService.uploadCSV(file);
  }

  @Get('read-csv')
  async readCSV() {
    return this.appService.readCSV();
  }

}
