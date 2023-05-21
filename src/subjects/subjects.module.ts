import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from './enitities/subject.entity';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SubjectRepository } from './subjects.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  controllers: [SubjectsController],
  providers: [SubjectsService, SubjectRepository],
})
export class SubjectsModule {}
