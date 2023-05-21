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
  ATTACHMENT_NOT_FOUND: {
    message: 'ATTACHMENT NOT FOUND',
    code: 'question004',
  },
  ATTACHMENT_INVALID_TYPE: {
    message: 'ATTACHMENT INVALID TYPE',
    code: 'question005',
  },
};
