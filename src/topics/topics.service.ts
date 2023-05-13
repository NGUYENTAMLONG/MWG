import { Injectable } from '@nestjs/common';
import { TopicRepository } from './topic.repository';
import { Like } from 'typeorm';
import { TOPICS_DEFAULT } from './constants/topic.constant';
import { uuid } from 'uuidv4';

@Injectable()
export class TopicsService {
  constructor(private readonly topicRepository: TopicRepository) {}

  async onModuleInit() {
    try {
      const foundExisted = await this.topicRepository.findExistedRecord();
      if (foundExisted.length !== 0) return;
      TOPICS_DEFAULT.forEach((topic) => (topic['tId'] = 'tId-' + uuid()));
      const InitializedTopics = await this.topicRepository.save(TOPICS_DEFAULT);
      console.log('INIT TOPICS SUCCESSFULL !!!');
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async getTopicList(query): Promise<any> {
    let condition = {};
    console.log(query);
    if (query.search) {
      condition = [{ name: Like(`%${query.search}%`) }];
    }
    console.log({ condition });
    return this.topicRepository.findAllByConditions(condition, query, {});
  }

  async createTopic(payload, thumbnail): Promise<any> {
    try {
      const newTopic = {
        ...payload,
        tId: 'tId-' + uuid(),
        thumbnail: thumbnail.filename,
      };
      const savedTopic = await this.topicRepository.save(newTopic);
      return savedTopic;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
