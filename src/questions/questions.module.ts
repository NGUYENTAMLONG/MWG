import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { AttachmentRepository } from './attachment.repository';
import { AttachmentEntity } from './entities/attachment.entity';
import { QuestionRepository } from './question.repository copy';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, AttachmentEntity])],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionRepository, AttachmentRepository],
  exports: [QuestionsService],
})
export class QuestionsModule {}
