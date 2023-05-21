import { Injectable } from '@nestjs/common';
import { SubjectRepository } from './subjects.repository';
import { SubjectEntity } from './enitities/subject.entity';
import { Like } from 'typeorm';
import { v4 } from 'uuid';
import { CreateSubjectDto } from './dtos/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  public async getAllSubjects(query): Promise<any> {
    let condition = {};
    if (query.search) {
      condition = [{ name: Like(`%${query.search}%`) }];
    }
    return this.subjectRepository.findAllByConditions(condition, query, {});
  }

  public async createOneSubject(payload: CreateSubjectDto): Promise<any> {
    try {
      const newSubject = {
        sId: 'qId-' + v4(),
        name: payload.name,
        description: payload.description,
        metadata: payload.metadata,
        levels: payload.levels,
      };
      //   const foundLevels = await
      return this.subjectRepository.save(newSubject);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
