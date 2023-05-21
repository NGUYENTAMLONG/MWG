import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AttachmentRepository } from './attachment.repository';
import { QuestionEntity } from './entities/question.entity';
import { IsNull, Like, Not } from 'typeorm';
import { v4 } from 'uuid';
import { CreateQuestionDto } from './dtos/create-question.dto';
import {
  ATTACHMENT_TYPE,
  EXCEPTION_QUESTION,
} from './contants/question.constant';
import { QuestionRepository } from './question.repository copy';
import { uploadS3 } from 'src/handles/upload-s3.handle';
import { UpdateOneQuestionDto } from './dtos/update-question.dto';

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
        qId: 'qId-' + v4(),
        question: payload.question,
        explain: payload.explain,
        note: payload.note,
        suggest: payload.suggest,
        metadata: payload.metadata,
      });
      if (image) {
        const uploadedFile: any = await uploadS3(image, 'question-images');
        await this.createImageAttachment(
          uploadedFile.Location,
          ATTACHMENT_TYPE.IMAGE,
          '',
          createdQuestion,
        );
      }
      return createdQuestion;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  public async updateQuestion(
    questionId: number,
    payload: UpdateOneQuestionDto,
    image: object,
  ): Promise<any> {
    try {
      const foundQuestion = await this.questionRepository.findOne({
        where: {
          id: questionId,
        },
        relations: {
          attachments: true,
        },
      });
      if (!foundQuestion) {
        throw new NotFoundException(EXCEPTION_QUESTION.QUESTION_NOT_FOUND);
      }
      const resultUpdateQuestion = await this.questionRepository.update(
        questionId,
        {
          question: payload.question,
          explain: payload.explain,
          note: payload.note,
          suggest: payload.suggest,
          metadata: payload.metadata,
        },
      );
      if (image) {
        const uploadedFile: any = await uploadS3(image, 'question-images');
        await this.updateImageAttachment(
          foundQuestion.id,
          uploadedFile.Location,
          ATTACHMENT_TYPE.IMAGE,
          '',
        );
      }
      if (resultUpdateQuestion.affected) {
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
  public async createImageAttachment(
    filename: any,
    type: string,
    note: string,
    question: QuestionEntity,
  ) {
    try {
      if (!Object.values(ATTACHMENT_TYPE).includes(type)) {
        throw new Error('TYPE IS INCORRECT');
      }
      const createdAttachment = await this.attachmentRepository.save({
        aId: 'aId-' + v4(),
        type: type,
        note: note,
        source: filename,
        question: question,
      });
      return createdAttachment;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  public async updateImageAttachment(
    questionId: number,
    filename: any,
    type: string,
    note: string,
  ) {
    try {
      if (!Object.values(ATTACHMENT_TYPE).includes(type)) {
        throw new Error('TYPE IS INCORRECT');
      }
      const foundQuestion = await this.questionRepository.findOne({
        where: {
          id: questionId,
        },
        relations: {
          attachments: true,
        },
      });
      const listImagesAttachment = foundQuestion.attachments.filter(
        (a) => a.type === ATTACHMENT_TYPE.IMAGE,
      );
      for (const attachment of listImagesAttachment) {
        await this.attachmentRepository.softDelete(attachment.id);
      }
      const createdNewAttachment = await this.attachmentRepository.save({
        aId: 'aId-' + v4(),
        type: type,
        note: note,
        source: filename,
        question: foundQuestion,
      });
      return createdNewAttachment;
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
  //     //   qId: qId ? qId : 'qId-' + v4(),
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

  public async softDeleteAttachmentOfQuestion(
    type: string,
    attachmentId: number,
  ): Promise<any> {
    try {
      if (!Object.values(ATTACHMENT_TYPE).includes(type)) {
        throw new BadRequestException(
          EXCEPTION_QUESTION.ATTACHMENT_INVALID_TYPE,
        );
      }
      const foundAttachment = await this.attachmentRepository.findOne({
        where: {
          id: attachmentId,
          type,
        },
      });
      if (!foundAttachment) {
        throw new BadRequestException(EXCEPTION_QUESTION.ATTACHMENT_NOT_FOUND);
      }
      const resultSoftDelete = await this.attachmentRepository.softDelete(
        foundAttachment.id,
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
  public async restoreAttachmentOfQuestion(
    type: string,
    attachmentId: number,
  ): Promise<any> {
    try {
      if (!Object.values(ATTACHMENT_TYPE).includes(type)) {
        throw new BadRequestException(
          EXCEPTION_QUESTION.ATTACHMENT_INVALID_TYPE,
        );
      }
      const foundAttachmentDeleted =
        await this.attachmentRepository.findOneDeleted({
          where: {
            id: attachmentId,
            type,
            deleted_at: Not(IsNull()),
          },
        });
      if (!foundAttachmentDeleted) {
        throw new BadRequestException(EXCEPTION_QUESTION.ATTACHMENT_NOT_FOUND);
      }
      const resultRestore = await this.attachmentRepository.restore(
        foundAttachmentDeleted.id,
      );
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
