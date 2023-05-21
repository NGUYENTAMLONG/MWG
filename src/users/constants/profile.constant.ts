export const PROFILE_CONST = {
  MODEL_NAME: 'profile',
  MODEL_PROVIDER: 'PROFILE_MODEL',
};

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Scope {
  FIRSTNAME = 'first_name',
  LASTNAME = 'last_name',
  NICKNAME = 'nickname',
  GENDER = 'gender',
  PHONENUMBER = 'phonenumber',
  ADDRESS = 'address',
}

export const EXCEPTION_PROFILE = {
  PROFILE_NOT_FOUND: {
    message: 'PROFILE NOT FOUND',
    code: 'prof001',
  },
  PROFILE_EXISTED: {
    message: 'PROFILE EXISTED',
    code: 'prof002',
  },
  PID_EXISTED: {
    message: 'PID EXISTED',
    code: 'prof003',
  },
};
