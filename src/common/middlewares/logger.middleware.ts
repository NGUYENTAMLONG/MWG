import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CommonLogger } from '../external-services/loggers/common.logger';
import { nonSensitiveLogger } from '../utils/logger.util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private loggerRequest = new CommonLogger('REQUEST');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, query, body } = request;
    this.loggerRequest.customInfo(
      `${method} ${originalUrl} - QUERY: ${nonSensitiveLogger(query)} - BODY: ${nonSensitiveLogger(body)}`,
    );
    next();
  }
}
