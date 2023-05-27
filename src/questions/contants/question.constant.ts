export const QUESTION_CONST = {
  MODEL_NAME: 'question',
  MODEL_PROVIDER: 'QUESTION_MODEL',
};

export const ATTACHMENT_CONST = {
  MODEL_NAME: 'attachment',
  MODEL_PROVIDER: 'ATTACHMMENT_MODEL',
};
export const ATTACHMENT_TYPE = {
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
};
export const EXCEPTION_QUESTION = {
  QUESTION_NOT_FOUND: {
    message: 'QUESTION NOT FOUND',
    code: 'question001',
  },
  QUESTION_EXISTED: {
    message: 'QUESTION EXISTED',
    code: 'question002',
  },
  SID_EXISTED: {
    message: 'QID EXISTED',
    code: 'question003',
  },
  INVALID_IMPORT_DATA: {
    message: 'INVALID IMPORT DATA',
    code: 'question004',
  },
  MORE_THAN_ONE_CORRECT_ANSWER: {
    message: 'MORE THAN ONE CORRECT ANSWER',
    code: 'question005',
  },
  HAS_NO_CORRECT_ANSWER:{
    message: 'HAS NO CORRECT ANSWERS',
    code: 'question006',
  }
};
