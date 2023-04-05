import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
