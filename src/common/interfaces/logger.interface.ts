import { HttpException } from '@nestjs/common';

export interface ILogger {
  method: string;
  path: string;
  ipAddress: string | string[];
  message?: string;
  data?: Record<string, unknown>;
  error?: HttpException;
}
