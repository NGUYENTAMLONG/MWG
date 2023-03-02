import { swaggerSchemaExample } from 'src/share/utils/swagger_schema';
import { IProfile } from './interfaces/user.interface';

export const PROFILE_SCOPE: IProfile = {
  address: 'address',
  first_name: 'first_name',
  last_name: 'last_name',
  gender: 'gender',
  nickname: 'nickname',
  phone_number: 'phonenumber',
};

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export const USER_CONST = {
  MODEL_NAME: 'user',
  MODEL_PROVIDER: 'USER_MODEL',
};

export const USER_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        id: 4,
        created_at: '2023-02-26T03:41:33.000Z',
        updated_at: '2023-02-26T03:41:33.000Z',
        deleted_at: null,
        uId: 'uId-e038ce51-85f3-4db4-bbd6-18636f6212c4',
        username: 'danphuong123',
        password:
          '$2b$10$YaHM7kO.EBDsoVrTwCZ3BeUAHbnUQ1BuOE2WUmgxZb1WBfbn2h.hi',
        email: 'danphuong@gmail.com',
        avatar: '/avatars/avatar-default.jpg',
      },
    },
    'Create success',
  ),
  UPDATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        success: true,
      },
    },
    'Update success',
  ),
  CREATE_MULTIPLE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        totalSuccess: 1,
        totalError: 0,
      },
    },
    'Create success',
  ),
  GET_WORD_SUCCESS: swaggerSchemaExample(
    {
      data: {
        wId: 'wId-63bcd93e-4e23-42b2-a677-8ecccece1b4b',
        word: 'king',
        part_of_speech: 'noun',
        example: 'a homecoming king.',
        meaning:
          'A man chosen as the winner of a contest or the honorary head of an event.',
        deleted_at: null,
        id: 6,
        created_at: '2023-02-21T09:48:06.000Z',
        updated_at: '2023-02-21T09:48:06.000Z',
      },
    },
    'get word success',
  ),
  NOT_FOUND_EXCEPTION: swaggerSchemaExample(
    {
      message: 'not found exception',
      code: 'us00001',
      statusCode: 404,
    },
    'Word not found exception',
  ),
  DELETE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        success: true,
      },
    },
    'Delete success',
  ),
  GET_LIST_SUCCESS: swaggerSchemaExample(
    {
      data: [
        {
          id: 2,
          created_at: '2023-02-24T14:14:11.000Z',
          updated_at: '2023-02-26T03:28:08.000Z',
          deleted_at: null,
          uId: 'uId-74ab96db-02ea-45fe-8b93-f4ee1154151c',
          username: 'tamlongbg',
          password:
            '$2b$10$RBNoyTF1hZdjXtD3ZnCyjOnbN4JOLv6C75MWneN.JUoIY9V1B7Rei',
          email: 'tamlong12032000@gmail.com',
          avatar: 'ken-6d2f.jpg',
        },
        {
          id: 3,
          created_at: '2023-02-26T03:40:56.000Z',
          updated_at: '2023-02-26T03:40:56.000Z',
          deleted_at: null,
          uId: 'uId-b8ff1e26-9fab-4bea-96db-aa834fea3848',
          username: 'haiduongbg',
          password:
            '$2b$10$Y2iDTADpgFlFUWYm23NwLeTAnZeckxv3UwyRTC38KwMVzQz2Vz8pe',
          email: 'haiduong07072000@gmail.com',
          avatar: '/avatars/avatar-default.jpg',
        },
        {
          id: 4,
          created_at: '2023-02-26T03:41:33.000Z',
          updated_at: '2023-02-26T03:41:33.000Z',
          deleted_at: null,
          uId: 'uId-e038ce51-85f3-4db4-bbd6-18636f6212c4',
          username: 'danphuong123',
          password:
            '$2b$10$YaHM7kO.EBDsoVrTwCZ3BeUAHbnUQ1BuOE2WUmgxZb1WBfbn2h.hi',
          email: 'danphuong@gmail.com',
          avatar: '/avatars/avatar-default.jpg',
        },
      ],
      total: 1,
      page: 1,
      pageSize: 3,
      totalPage: 1,
    },
    'get List User',
  ),
  BAD_REQUEST_EXCEPTION: swaggerSchemaExample(
    {
      message: 'bad exception',
      code: 'sys00001',
      statusCode: 400,
    },
    'bad request exception',
  ),
};
