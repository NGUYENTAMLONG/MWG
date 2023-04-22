import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'mysql.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordEntity } from './words/entities/word.entity';
// import config from './database/configs/mysql.config';
import { WordsModule } from './words/words.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserEntity } from './users/entities/user.entity';
import { ProfileEntity } from './users/entities/profile.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { RoleEntity } from './roles/entities/role.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { PermissionEntity } from './permissions/entities/permission.entity';
import { TeachersModule } from './teachers/teachers.module';
import { QuestionsModule } from './questions/questions.module';
import { QuestionEntity } from './questions/entities/question.entity';
import { AnswersModule } from './answers/answers.module';
import { AnswerEntity } from './answers/entities/answer.entity';
import { TopicsModule } from './topics/topics.module';
import { ExamsModule } from './exams/exams.module';
import { LevelsModule } from './levels/levels.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TopicEntity } from './topics/entities/topic.entity';
import { ExamEntity } from './exams/entities/exam.entity';
import { LevelEntity } from './levels/entities/level.entity';
import { SubjectEntity } from './subjects/enitities/subject.entity';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'src/assets'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mwg',
      entities: [
        WordEntity,
        UserEntity,
        ProfileEntity,
        RoleEntity,
        PermissionEntity,
        QuestionEntity,
        AnswerEntity,
        TopicEntity,
        ExamEntity,
        LevelEntity,
        SubjectEntity,
      ],
      synchronize: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://tamlong12032000:PziKHF2heASbu7Xd@cluster0.7o9ulpa.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
    WordsModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    TeachersModule,
    QuestionsModule,
    AnswersModule,
    TopicsModule,
    ExamsModule,
    LevelsModule,
    SubjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// PziKHF2heASbu7Xd;
