import {
  swaggerSchemaArr,
  swaggerSchemaExample,
} from 'src/common/utils/swagger.util';

export const FEEDBACK_CONST = {
  MODEL_NAME: 'feedback',
  MODEL_PROVIDER: 'FEEDBACK_MODEL',
};

export enum FeedbackTypes {
  EXAM_FEEDBACK = 'exam feedback',
  QUESTION_FEEDBACK = 'question feedback',
}

export const EXCEPTION_FEEDBACK = {
  FEEDBACK_NOT_FOUND: {
    message: 'FEEDBACK NOT FOUND',
    code: 'feedback001',
  },
  FEEDBACK_EXISTED: {
    message: 'FEEDBACK EXISTED',
    code: 'feedback002',
  },
  SID_EXISTED: {
    message: 'QID EXISTED',
    code: 'feedback003',
  },
};

export const FEEDBACK_SWAGGER_RESPONSE = {};
