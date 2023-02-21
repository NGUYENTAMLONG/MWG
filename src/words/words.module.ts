import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './entities/word.entity';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  imports: [TypeOrmModule.forFeature([WordEntity]), HttpModule],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
