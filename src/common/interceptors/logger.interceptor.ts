import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { CommonLogger } from '../external-services/loggers/common.logger';
import { nonSensitiveLogger } from '../utils/logger.util';

@Injectable()
export class LoggerInterceptor<T> implements NestInterceptor<T, T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    const loggerResponse = new CommonLogger('RESPONSE');
    const { method, originalUrl } = context.switchToHttp().getRequest<Request>();
    const { statusCode } = context.switchToHttp().getResponse<Response>();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap((data) =>
          loggerResponse.customInfo(
            method !== 'GET'
              ? `${method} ${originalUrl} ${statusCode} - IN: ${Date.now() - now}ms - BODY: ${nonSensitiveLogger(data)}`
              : `${method} ${originalUrl} ${statusCode} - IN: ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
