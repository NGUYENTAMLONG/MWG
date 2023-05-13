import { Module } from '@nestjs/common';
import { FeedbacksController } from './feedbacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackEntity } from './entities/feedback.entity';
import { FeedbacksService } from './feedbacks.service';
import { FeedbackRepository } from './feedbacks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackEntity])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService, FeedbackRepository],
  exports: [FeedbacksService],
})
export class FeedbacksModule {}
