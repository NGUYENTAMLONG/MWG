import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from './feedbacks.repository';

@Injectable()
export class FeedbacksService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  public async createOneFeedback(payload, feedbackImage) {
    return {payload, feedbackImage};
  }

  findAll() {
    return `This action returns all exams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exam`;
  }

  update(id: number) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
