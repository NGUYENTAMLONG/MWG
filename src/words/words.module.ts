import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './entities/word.entity';
import { Game, GameSchema } from './schemas/game.schema';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WordEntity]),
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    HttpModule,
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
