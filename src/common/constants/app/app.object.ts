import { ApiProperty } from '@nestjs/swagger';
import { COMMON_ERROR } from '../errors/common-error.constant';
import { COMMON_EXCEPTION } from '../exceptions/common-exception.constant';

export class BadRequestEntity {
  @ApiProperty({ description: 'path', example: '/api/v1/variants' })
  path: string;

  @ApiProperty({ description: 'statusCode', example: '400' })
  statusCode: number;

  @ApiProperty({
    description: 'code',
    example: COMMON_ERROR.COMMON_BADREQUEST_ERROR.CODE,
  })
  code: string;

  @ApiProperty({
    description: 'message',
    example: COMMON_ERROR.COMMON_BADREQUEST_ERROR.MESSAGE,
  })
  message: string;
}

export class NotFoundEntity {
  @ApiProperty({ description: 'path', example: '/api/v1/variants' })
  path: string;

  @ApiProperty({ description: 'statusCode', example: '404' })
  statusCode: number;

  @ApiProperty({
    description: 'code',
    example: COMMON_EXCEPTION.COMMON_NOTFOUND_EXCEPTION.CODE,
  })
  code: string;

  @ApiProperty({
    description: 'message',
    example: COMMON_EXCEPTION.COMMON_NOTFOUND_EXCEPTION.MESSAGE,
  })
  message: string;
}

export class InternalServerErrorEntity {
  @ApiProperty({ description: 'path', example: '/api/v1/variants' })
  path: string;

  @ApiProperty({ description: 'statusCode', example: '500' })
  statusCode: number;

  @ApiProperty({
    description: 'code',
    example: COMMON_ERROR.COMMON_SYSTEM_ERROR.CODE,
  })
  code: string;

  @ApiProperty({
    description: 'message',
    example: COMMON_ERROR.COMMON_SYSTEM_ERROR.MESSAGE,
  })
  message: string;
}
export class UnauthorizedEntity {
  @ApiProperty({ description: 'path', example: '/api/v1/variants' })
  path: string;

  @ApiProperty({ description: 'statusCode', example: '401' })
  statusCode: number;

  @ApiProperty({
    description: 'code',
    example: COMMON_ERROR.COMMON_UNAUTHORIZED_ERROR.CODE,
  })
  code: string;

  @ApiProperty({
    description: 'message',
    example: COMMON_ERROR.COMMON_UNAUTHORIZED_ERROR.MESSAGE,
  })
  message: string;
}
