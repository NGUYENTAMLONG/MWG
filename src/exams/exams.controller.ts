import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('exams')
@Controller({ version: ['1'], path: 'exams' })
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  create() {
    return this.examsService.create();
  }

  @Get()
  findAll() {
    return this.examsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.examsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id);
  }
}
