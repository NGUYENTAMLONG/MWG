import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicEntity } from './entities/topic.entity';
import { TopicRepository } from './topic.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity])],
  controllers: [TopicsController],
  providers: [TopicsService, TopicRepository],
  exports: [TopicsService],
})
export class TopicsModule {}
