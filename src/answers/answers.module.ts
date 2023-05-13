import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from './entities/answer.entity';
import { AnswerRepository } from './answer.repository';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity]), QuestionsModule],
  controllers: [AnswersController],
  providers: [AnswersService, AnswerRepository],
})
export class AnswersModule {}
