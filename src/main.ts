import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestEntity,
  InternalServerErrorEntity,
  NotFoundEntity,
  UnauthorizedEntity,
} from './common/constants/app/app.object';
import { resolve } from 'path';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
// import * as hbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.enableCors({
  //   origin: [],
  // });
  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('The description of API')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact('tamlongnguyen', '/api-docs', 'tamlong12032000@gmail.com')
    .addApiKey({ type: 'apiKey', in: 'header', name: 'some' }, 'some')
    .setLicense('LICENSED-MIT', 'https://choosealicense.com/licenses/mit/')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [
      BadRequestEntity,
      NotFoundEntity,
      InternalServerErrorEntity,
      UnauthorizedEntity,
    ],
  });
  SwaggerModule.setup('/api-docs', app, document);
  // app.useStaticAssets(join(__dirname, '..', './src/public'));
  // app.setBaseViewsDir(join(__dirname, '..', './src/views'));
  // app.engine('hbs', hbs.engine({ extname: 'hbs' }));
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./views'));
  app.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();
