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
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'src/assets'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mwg',
      entities: [WordEntity, UserEntity, ProfileEntity],
      synchronize: true,
    }),
    WordsModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://tamlong12032000:Tamlong1@game.7o9ulpa.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
