import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { Repository } from 'typeorm';
import { LevelEntity } from './entities/level.entity';

@Injectable()
export class LevelRepository extends TypeOrmRepository<LevelEntity> {
  constructor(
    @InjectRepository(LevelEntity)
    levelEntity: Repository<LevelEntity>,
  ) {
    super(levelEntity);
  }
}
