import {
  Controller,
  Get,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../helpers/file.helper';
import { csvFileFilter } from './validators/validation-file';

@ApiTags('app')
@Controller({ version: ['1'], path: 'app' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('get-page')
  @Render('index') // Render the 'index.ejs' template
  getIndex() {
    return { message: 'Hello, world!' };
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
  @Get('test-data')
  async testData() {
    const jsonData = [
      {
        name: 'John Doe',
        age: 30,
        address: { street: '123 Main St', city: 'New York' },
      },
      {
        name: 'Jane Smith',
        age: 35,
        address: { street: '456 Elm St', city: 'Los Angeles' },
      },
    ];

    const filePath = './src/assets/csv/data/test.xlsx';

    return this.appService.generateExcelFromJson(jsonData, filePath);
  }
  // @Get('gen-excel-from-json')
  // async generateExcelFromJson() {
  //   return this.appService.generateExcelFromJson();
  // }
  @Get('gen-json-from-excel')
  async generateJsonFromExcel() {
    return this.appService.generateJsonFromExcel();
  }
}
