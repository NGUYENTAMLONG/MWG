import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamEntity } from './entities/exam.entity';
import { ExamRepository } from './exams.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity])],
  controllers: [ExamsController],
  providers: [ExamsService, ExamRepository],
  exports: [ExamsService],
})
export class ExamsModule {}
