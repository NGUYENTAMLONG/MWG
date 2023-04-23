import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { LevelRepository } from './levels.repository';

@Injectable()
export class LevelsService {
  constructor(private readonly levelRepository: LevelRepository) {}

  getLevelList(query): Promise<any> {
    let condition = {};
    if (query.search) {
      condition = [{ title: Like(`%${query.search}%`) }];
    }
    return this.levelRepository.findAllByConditions(condition, query, {});
  }
}
