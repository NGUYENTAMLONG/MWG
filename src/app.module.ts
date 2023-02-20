import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'mysql.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordEntity } from './words/entities/word.entity';
// import config from './database/configs/mysql.config';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mwg',
      entities: [WordEntity],
      synchronize: true,
    }),
    WordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
