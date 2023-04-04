export const USER_CONST = {
  MODEL_NAME: 'user',
  MODEL_PROVIDER: 'USER_MODEL',
};

export const ADMIN_DEFAULT = [];

export const USER_DEFAULT_PROFILE_IMG = {
  URL: '/public/images/avatar-default.jpg',
};

export const EXCEPTION_USER = {
  USER_NOT_FOUND: {
    message: 'USER NOT FOUND',
    code: 'user001',
  },
  USER_EXISTED: {
    message: 'USER EXISTED',
    code: 'user002',
  },
  EMAIL_EXISTED: {
    message: 'EMAIL EXISTED',
    code: 'user003',
  },
  SID_EXISTED: {
    message: 'SID EXISTED',
    code: 'user004',
  },
};
