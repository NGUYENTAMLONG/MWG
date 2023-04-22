import { Injectable } from '@nestjs/common';
import { ExamRepository } from './exams.repository';

@Injectable()
export class ExamsService {
  constructor(private readonly examRepository: ExamRepository) {}
  create() {
    return 'This action adds a new exam';
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
