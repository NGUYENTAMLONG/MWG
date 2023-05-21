import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubjectsService } from './subjects.service';
import { SubjectEntity } from './enitities/subject.entity';
import { QueryParamDto } from './dtos/query-param.dto';
import { CreateSubjectDto } from './dtos/create-subject.dto';

@ApiTags('subjects')
@Controller({ version: ['1'], path: 'subjects' })
export class SubjectsController {
  constructor(private readonly subjectService: SubjectsService) {}

  @Get()
  getList(@Query() queries: QueryParamDto): Promise<SubjectEntity[]> {
    return this.subjectService.getAllSubjects(queries);
  }
  @Post()
  createOne(@Body() payload: CreateSubjectDto): Promise<SubjectEntity> {
    return this.subjectService.createOneSubject(payload);
  }
}
