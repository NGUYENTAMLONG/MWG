import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { Repository } from 'typeorm';
import { ExamEntity } from './entities/exam.entity';

@Injectable()
export class ExamRepository extends TypeOrmRepository<ExamEntity> {
  constructor(
    @InjectRepository(ExamEntity)
    examEntity: Repository<ExamEntity>,
  ) {
    super(examEntity);
  }
}
