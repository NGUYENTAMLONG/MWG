import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ILogger } from './../interfaces/logger.interface';
import { CommonLogger } from '../external-services/loggers/common.logger';
import { COMMON_ERROR } from './../constants/errors/common-error.constant';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new CommonLogger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception.message || COMMON_ERROR.COMMON_SYSTEM_ERROR.MESSAGE;

    if (status == HttpStatus.INTERNAL_SERVER_ERROR) {
      const log: ILogger = {
        path: request.path,
        ipAddress: request.headers['x-forwarded-for'] || request.ip,
        method: request.method,
        error: exception,
      };
      const errorMessage = `${request.method} ${request.originalUrl} - MESSAGE: ${message}`;
      const detailMessage = `- DETAIL: ${JSON.stringify(log)}`;
      this.logger.customError(errorMessage, exception.stack, detailMessage);
    } else {
      const errorMessage = `${request.method} ${request.originalUrl} - MESSAGE: ${message}`;
      const detailMessage = `- DETAIL: ${JSON.stringify(
        exception.getResponse(),
      )}`;
      this.logger.customInfo(errorMessage, detailMessage);
    }

    response.status(status).json({
      path: request.url,
      message:
        status == HttpStatus.INTERNAL_SERVER_ERROR
          ? COMMON_ERROR.COMMON_SYSTEM_ERROR.MESSAGE
          : message,
      code:
        exception.getResponse()['code'] ||
        COMMON_ERROR.COMMON_SYSTEM_ERROR.CODE,
      errors: exception.getResponse()['errors'],
      statusCode: status,
    });
  }
}
