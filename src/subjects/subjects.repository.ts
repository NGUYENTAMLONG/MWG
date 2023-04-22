import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { Repository } from 'typeorm';
import { SubjectEntity } from './enitities/subject.entity';

@Injectable()
export class SubjectRepository extends TypeOrmRepository<SubjectEntity> {
  constructor(
    @InjectRepository(SubjectEntity)
    subjectEntity: Repository<SubjectEntity>,
  ) {
    super(subjectEntity);
  }
}
