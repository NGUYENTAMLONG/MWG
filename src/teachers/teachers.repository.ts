import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { Repository } from 'typeorm';
import { TeacherEntity } from './enitities/teacher.entity';

@Injectable()
export class TeacherRepository extends TypeOrmRepository<TeacherEntity> {
  constructor(
    @InjectRepository(TeacherEntity)
    teacherEntity: Repository<TeacherEntity>,
  ) {
    super(teacherEntity);
  }
}
