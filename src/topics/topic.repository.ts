import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { Repository } from 'typeorm';
import { TopicEntity } from './entities/topic.entity';

@Injectable()
export class TopicRepository extends TypeOrmRepository<TopicEntity> {
  constructor(
    @InjectRepository(TopicEntity)
    topicEntity: Repository<TopicEntity>,
  ) {
    super(topicEntity);
  }
}
