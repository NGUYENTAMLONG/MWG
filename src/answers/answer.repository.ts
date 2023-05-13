import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { Repository } from 'typeorm';
import { AnswerEntity } from './entities/answer.entity';

@Injectable()
export class AnswerRepository extends TypeOrmRepository<AnswerEntity> {
  constructor(
    @InjectRepository(AnswerEntity)
    answerEntity: Repository<AnswerEntity>,
  ) {
    super(answerEntity);
  }
}
