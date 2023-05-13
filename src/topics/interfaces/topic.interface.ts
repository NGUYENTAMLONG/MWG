import { TopicEntity } from '../entities/topic.entity';

export interface ICreateTopic {
  tId: string;
  name: string;
  description: string;
  thumbnail?: string;
}
export interface IUpdateTopic {}
export class TopicDetailResponseSchema extends TopicEntity {}
