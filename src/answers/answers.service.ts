import { Injectable } from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { Like } from 'typeorm';

@Injectable()
export class AnswersService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  getAnswerList(query): Promise<any> {
    let condition = {};
    if (query.search) {
      condition = [{ content: Like(`%${query.search}%`) }];
    }
    return this.answerRepository.findAllByConditions(
      condition,
      query,
      {},
      {
        content: true,
        correct: true,
      },
    );
  }
}
