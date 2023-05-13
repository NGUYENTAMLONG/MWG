import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { DataSource, Like } from 'typeorm';
import { CreateOneAnswerDto } from './dtos/create-answer.dto';
import { AnswerEntity } from './entities/answer.entity';
import { uuid } from 'uuidv4';
import { QuestionsService } from 'src/questions/questions.service';
import { EXCEPTION_ANSWER } from './contants/answer.constant';
import { UpdateOneAnswerDto } from './dtos/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly questionService: QuestionsService,
    private readonly myDataSource: DataSource,
  ) {}

  public async getAnswerList(query): Promise<any> {
    let condition = {};
    if (query.search) {
      condition = [{ content: Like(`%${query.search}%`) }];
    }
    return this.answerRepository.findAllByConditions(
      condition,
      query,
      {
        question: true,
      },
      // {
      //   content: true,
      //   correct: true,
      // },
    );
  }

  public async createOneAnswer(
    payload: CreateOneAnswerDto,
  ): Promise<AnswerEntity> {
    try {
      const { content, correct, metadata, questionId } = payload;
      let question = null;
      //Check Question...
      if (questionId) {
        const foundQuestion = await this.questionService.getOneQuestionById(
          questionId,
        );
        if (foundQuestion) {
          question = foundQuestion;
        } else {
          throw new NotFoundException(
            EXCEPTION_ANSWER.NOT_FOUND_QUESTION_FOR_ANSWER,
          );
        }
      }
      //Check Correct Duplicate...
      if (correct && questionId) {
        const foundAllAnswersOfQuestion =
          await this.questionService.getAllAnswersOfQuestion(questionId);
        const correctAnswer = foundAllAnswersOfQuestion.answers.filter(
          (answer, index) => {
            return answer.correct === true;
          },
        );
        if (correctAnswer.length > 0) {
          throw new BadRequestException(
            EXCEPTION_ANSWER.DUPLICATE_CORRECT_ANSWER,
          );
        }
      }
      const newAnswer = {
        aId: 'aId-' + uuid(),
        content,
        correct,
        metadata,
        question,
      };
      const createdAnswer = await this.answerRepository
        .create(newAnswer)
        .save();
      return createdAnswer;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public async updateOneAnswer(
    answerId: number,
    payload: UpdateOneAnswerDto,
  ): Promise<any> {
    const { content, correct, metadata, questionId } = payload;
    try {
      const answer = await this.answerRepository.findOne({
        where: {
          id: answerId,
        },
      });
      if (!answer) {
        throw new BadRequestException(EXCEPTION_ANSWER.ANSWER_NOT_FOUND);
      }
      let question = null;
      if (questionId) {
        const foundQuestion = await this.questionService.getOneQuestionById(
          questionId,
        );
        if (foundQuestion) {
          if (correct) {
            const foundAllAnswersOfQuestion =
              await this.questionService.getAllAnswersOfQuestion(questionId);
            const correctAnswer = foundAllAnswersOfQuestion.answers.filter(
              (answer, index) => {
                return answer.correct === true && answer.id !== answerId;
              },
            );
            if (correctAnswer.length > 0) {
              throw new BadRequestException(
                EXCEPTION_ANSWER.DUPLICATE_CORRECT_ANSWER,
              );
            }
          }
          question = foundQuestion;
        } else {
          throw new NotFoundException(
            EXCEPTION_ANSWER.NOT_FOUND_QUESTION_FOR_ANSWER,
          );
        }
      }

      const resultUpdate = await this.answerRepository.update(answerId, {
        content,
        correct,
        metadata,
        question,
      });
      if (resultUpdate.affected) {
        return {
          success: true,
        };
      }
      return {
        success: false,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  public async softDeleteOneAnswer(answerId: number): Promise<any> {
    try {
      const resultSoftDelete = await this.answerRepository.softDelete(answerId);
      if (resultSoftDelete.affected) {
        return {
          success: true,
        };
      }
      return {
        success: false,
      };
    } catch (error) {
      return error;
    }
  }
  public async restoreOneAnswer(answerId: number): Promise<any> {
    try {
      const resultRestore = await this.answerRepository.restore(answerId);
      if (resultRestore.affected) {
        return {
          success: true,
        };
      }
      return {
        success: false,
      };
    } catch (error) {
      return error;
    }
  }
}
