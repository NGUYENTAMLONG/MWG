import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TeacherRepository } from './teachers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from './enitities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity])],
  controllers: [TeachersController],
  providers: [TeachersService, TeacherRepository],
  exports: [TeachersService],
})
export class TeachersModule {}
