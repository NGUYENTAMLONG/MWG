import { Injectable } from '@nestjs/common';
import { AttachmentRepository } from './attachment.repository';
import { QuestionEntity } from './entities/question.entity';
import { Like } from 'typeorm';
import { uuid } from 'uuidv4';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { ATTACHMENT_TYPE } from './contants/question.constant';
import { QuestionRepository } from './question.repository copy';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly attachmentRepository: AttachmentRepository,
  ) {}

  public async getOneQuestionById(questionId: number): Promise<QuestionEntity> {
    return this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });
  }
  public async getAllAnswersOfQuestion(
    questionId: number,
  ): Promise<QuestionEntity> {
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
      relations: {
        answers: true,
      },
    });
    return question;
  }
  public async getQuestionList(query): Promise<any> {
    let condition = {};
    if (query.search) {
      condition = [{ question: Like(`%${query.search}%`) }];
    }
    return this.questionRepository.findAllByConditions(
      condition,
      query,
      {
        attachments: true,
      },
      // {
      //   question: true,
      //   suggest: true,
      // },
    );
  }
  public async getQuestionListIncludeAnswers(query): Promise<any> {
    let condition = {};
    if (query.search) {
      condition = [{ question: Like(`%${query.search}%`) }];
    }
    return this.questionRepository.findAllByConditions(
      condition,
      query,
      {
        attachments: true,
        answers: true,
      },
      // {
      //   question: true,
      //   suggest: true,
      // },
    );
  }
  public async createQuestion(
    payload: CreateQuestionDto,
    image: object,
  ): Promise<QuestionEntity> {
    try {
      const createdQuestion = await this.questionRepository.save({
        qId: payload.qId ? payload.qId : 'qId-' + uuid(),
        question: payload.question,
        explain: payload.explain,
        note: payload.note,
        suggest: payload.suggest,
        metadata: payload.metadata,
      });
      let attachmentCreated = null;
      if (image) {
        attachmentCreated = await this.createImageAttachment(
          image,
          ATTACHMENT_TYPE.IMAGE,
          '',
          createdQuestion,
        );
      }
      console.log({ createdQuestion, attachmentCreated });
      return createdQuestion;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  public async createImageAttachment(
    file: any,
    type: string,
    note: string,
    question: QuestionEntity,
  ) {
    try {
      if (!Object.values(ATTACHMENT_TYPE).includes(type)) {
        throw new Error('TYPE IS INCORRECT');
      }
      const createdAttachment = await this.attachmentRepository.save({
        aId: 'aId-' + uuid(),
        type: type,
        note: note,
        source: file.filename,
        question: question,
      });
      return createdAttachment;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  // public async createQuestionWithAnswers(
  //   payloadQuestion: CreateQuestionDto,
  //   payloadAnswers: AnswerDto[],
  //   image: object,
  // ): Promise<QuestionEntity> {
  //   try {
  //     const { qId, question, explain, note, suggest, metadata } =
  //       payloadQuestion;
  //       console.log()
  //     // const createdQuestion = await this.questionRepository.save({
  //     //   qId: qId ? qId : 'qId-' + uuid(),
  //     //   question,
  //     //   explain,
  //     //   note,
  //     //   suggest,
  //     //   metadata,
  //     // });
  //     // let attachmentCreated = null;
  //     // if (image) {
  //     //   attachmentCreated = await this.createImageAttachment(
  //     //     image,
  //     //     ATTACHMENT_TYPE.IMAGE,
  //     //     '',
  //     //     createdQuestion,
  //     //   );
  //     // }
  //     // const created;
  //     return createdQuestion;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }
  public async softDeleteOneQuestion(questionId: number): Promise<any> {
    try {
      const resultSoftDelete = await this.questionRepository.softDelete(
        questionId,
      );
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
  public async restoreOneQuestion(questionId: number): Promise<any> {
    try {
      const resultRestore = await this.questionRepository.restore(questionId);
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
