import { Injectable } from '@nestjs/common';
import { TopicRepository } from './topic.repository';
import { Like } from 'typeorm';

@Injectable()
export class TopicsService {
  constructor(private readonly topicRepository: TopicRepository) {}
  async getTopicList(query): Promise<any> {
    let condition = {};
    console.log(query);
    if (query.search) {
      condition = [{ name: Like(`%${query.search}%`) }];
    }
    console.log({ condition });
    return this.topicRepository.findAllByConditions(condition, query, {});
  }
}
