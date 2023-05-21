import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { UserRepository } from './user.repository';
import { ProfileRepository } from './profile.repository';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { TeachersModule } from 'src/teachers/teachers.module';
import { TeacherEntity } from 'src/teachers/enitities/teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProfileEntity, TeacherEntity]),
  ],
  providers: [UsersService, UserRepository, ProfileRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
