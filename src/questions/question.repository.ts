import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { Repository } from 'typeorm';
import { QuestionEntity } from './entities/question.entity';

@Injectable()
export class QuestionRepository extends TypeOrmRepository<QuestionEntity> {
  constructor(
    @InjectRepository(QuestionEntity)
    questionEntity: Repository<QuestionEntity>,
  ) {
    super(questionEntity);
  }
}
