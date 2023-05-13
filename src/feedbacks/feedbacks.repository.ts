import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { Repository } from 'typeorm';
import { FeedbackEntity } from './entities/feedback.entity';

@Injectable()
export class FeedbackRepository extends TypeOrmRepository<FeedbackEntity> {
  constructor(
    @InjectRepository(FeedbackEntity)
    feedbackEntity: Repository<FeedbackEntity>,
  ) {
    super(feedbackEntity);
  }
}
