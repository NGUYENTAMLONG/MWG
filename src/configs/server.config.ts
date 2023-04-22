import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerInterceptor } from './../common/interceptors/logger.interceptor';
import { TransformInterceptor } from './../common/interceptors/transform.interceptor';
import { ValidationPipe } from './../common/pipes/validation.pipe';
import { HttpExceptionFilter } from './../common/exception-filters/http-exception.filter';
import { BadRequestEntity } from 'src/common/constants/app/app.object';

export default function (app: INestApplication) {
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
    prefix: 'api/v',
  });
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  if (process.env.NODE_ENV !== 'production') {
    const configDocument = new DocumentBuilder()
      .setTitle('API document (System Site Server)')
      .setDescription('APIs documents for NestJS')
      .setVersion('1.0')
      .addBearerAuth()
      .addServer('http://localhost:8000/')
      .build();
    const document = SwaggerModule.createDocument(app, configDocument, {
      extraModels: [BadRequestEntity],
    });
    SwaggerModule.setup('api-docs', app, document);
  }
}
