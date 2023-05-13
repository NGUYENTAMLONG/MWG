import {
  ValidationPipe as BaseValidationPipe,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  ValidationPipeOptions,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe extends BaseValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super(options);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Unprocessable Entity',
          errors: error.response?.message || error.message,
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
