import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { QuestionEntity } from './entities/question.entity';
import { Like } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  getQuestionList(query): Promise<any> {
    let condition = {};
    if (query.search) {
      condition = [
        { username: Like(`%${query.search}%`) },
        { email: Like(`%${query.search}%`) },
      ];
    }
    return this.questionRepository.findAllByConditions(
      condition,
      query,
      {},
      {
        question: true,
        explain: true,
      },
    );
  }
}
