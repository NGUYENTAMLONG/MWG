import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from './entities/level.entity';
import { LevelRepository } from './levels.repository';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';

@Module({
  imports: [TypeOrmModule.forFeature([LevelEntity])],
  controllers: [LevelsController],
  providers: [LevelsService, LevelRepository],
})
export class LevelsModule {}
