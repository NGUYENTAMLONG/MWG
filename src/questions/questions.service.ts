import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AttachmentRepository } from './attachment.repository';
import { QuestionEntity } from './entities/question.entity';
import { DataSource, Like } from 'typeorm';
import { v4 } from 'uuid';
import { CreateQuestionDto } from './dtos/create-question.dto';
import {
  ATTACHMENT_TYPE,
  EXCEPTION_QUESTION,
} from './contants/question.constant';
import { QuestionRepository } from './question.repository copy';
import { uploadS3 } from 'src/handles/upload-s3.handle';
import { UpdateOneQuestionDto } from './dtos/update-question.dto';
import { generateJsonFromExcel } from '../../helpers/excel.helper';
import { AnswerEntity } from 'src/answers/entities/answer.entity';
import { EXCEPTION_ANSWER } from 'src/answers/contants/answer.constant';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly attachmentRepository: AttachmentRepository,
    private readonly dataSource: DataSource,
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
  public async createQAFromExcel():Promise<any>{
     
    // create a new query runner
    const queryRunner = this.dataSource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();
    try {
      const data = generateJsonFromExcel();
      const  checkAnswers = this.validateCorrectAnswers(data);
      if (checkAnswers.existedCorrect && !checkAnswers.flag
        && checkAnswers.invalidQuestions.length > 0
        ) {
        throw new BadRequestException(EXCEPTION_QUESTION.MORE_THAN_ONE_CORRECT_ANSWER)
      }
      if (!checkAnswers.existedCorrect && !checkAnswers.flag
        && checkAnswers.invalidQuestions.length > 0
        ) {
        throw new BadRequestException(EXCEPTION_QUESTION.INVALID_IMPORT_DATA)
      }
      // return checkAnswers;
      for (const element of data) {
        const newQuestion = {
          qId: 'qId-' + v4(),
          question: element.question,
          explain: element.explain,
          note: element.note,
          suggest: element.suggest,
          metadata: element.metadata,
        };
        const savedQuestion =  await queryRunner.manager.save(QuestionEntity, newQuestion);
        const answers = element.answers;
        for (const answer of answers) {
          const newAnswer = {
            aId: 'aId-' + v4(),
            content:answer.content,
            correct:answer.correct,
            metadata:answer.metadata,
            question:savedQuestion,
          };
          const savedAnswer =  await queryRunner.manager.save(AnswerEntity, newAnswer);
        }
      }
      // commit transaction now:
      await queryRunner.commitTransaction();
      return {success:true,message:"IMPORT DATA SUCCESSFUL !!!"};
    } catch (error) {
      console.log({ rollback: true, error });
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  public validateCorrectAnswers(payload: object[]) {
    const checkAnswers = { flag: true, invalidQuestions: [], existedCorrect: true }
    for (const question of payload) {
      const correctAnswers = question['answers'].filter((answer) => answer.correct === true);
      if (correctAnswers.length > 1) {
        checkAnswers.invalidQuestions.push(question);
      }
      if (correctAnswers.length === 0) {
        checkAnswers.invalidQuestions.push(question);
        checkAnswers.existedCorrect = false;
      }
    }
    if (checkAnswers.invalidQuestions.length > 0) {
      checkAnswers.flag = false
    }
    return checkAnswers;
  }

  public validateAnswers(payload: object[]) {
    const checkAnswers = { isEmpty: false , questionsWrongDto:[],answersWrongDto:[] }
    for (const question of payload) {
      const existedEmptyAnswer = question['answers'].length;
      if (existedEmptyAnswer === 0) {
        checkAnswers.isEmpty = true
      }
    }
    // if (checkAnswers.invalidQuestions.length > 0) {
    //   checkAnswers.flag = false
    // }
    return checkAnswers;
  }
}
