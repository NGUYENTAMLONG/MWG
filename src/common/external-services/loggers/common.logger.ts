import { Logger } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const { label, printf } = winston.format;

const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export class CommonLogger extends Logger {
  private winstonLogger: winston.Logger;

  constructor(context?: string) {
    super(context);
    const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
      filename: '%DATE%.log',
      dirname: './logs/',
      datePattern: 'YYYY-MM-DD',
      maxSize: '10m',
      maxFiles: '7d',
      format: winston.format.combine(
        label({ label: context || 'COMMON' }),
        winston.format.timestamp(),
        loggerFormat,
      ),
    });
    this.winstonLogger = winston.createLogger({
      transports: [dailyRotateFileTransport],
    });
  }

  customError(message: string, stack: string, extendMessage?: string) {
    this.winstonLogger.error(message, { message: extendMessage });
    super.error(message, stack);
  }

  customInfo(message: string, extendMessage?: string) {
    this.winstonLogger.info(message, { message: extendMessage });
    super.log(message);
  }
}
