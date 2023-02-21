import { swaggerSchemaExample } from 'src/share/utils/swagger_schema';

export const WORD_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        id: '5',
        wId: 'wId-8a86b106-8db7-4c8a-9091-f809f64601e4',
        word: 'long',
        part_of_speech: 'adjective',
        example: 'the long edge of the door.',
        meaning:
          'Having the greater length of two or the greatest length of several.',
        deleted_at: null,
        created_at: '2022-10-25T02:18:54.638Z',
        updated_at: '2022-10-25T02:18:54.638Z',
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
    'not found exception',
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
          id: 5,
          wId: 'wId-8a86b106-8db7-4c8a-9091-f809f64601e4',
          word: 'long',
          part_of_speech: 'adjective',
          example: 'the long edge of the door.',
          meaning:
            'Having the greater length of two or the greatest length of several.',
          deleted_at: null,
          created_at: '2022-10-25T02:18:54.638Z',
          updated_at: '2022-10-25T02:18:54.638Z',
        },
        {
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
      ],
      total: 1,
      page: 1,
      pageSize: 2,
      totalPage: 1,
    },
    'get List Word',
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
