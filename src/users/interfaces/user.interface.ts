import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export interface IProfile {
  first_name: string;
  last_name: string;
  nickname: string;
  gender: string;
  phone_number: string;
  address: string;
}

export interface ICreateUser {
  uid: string;
  username: string;
  email: string;
  password: string;
  address: string;
}
export interface IUpdateUser {}
export class UserDetailResponseSchema extends OmitType(UserEntity, [
  'password',
] as const) {}
