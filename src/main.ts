import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());

  app.use(json({ limit: '60mb' }));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('RESTful api with NestJS')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('courses')
    .addTag('videos')
    .addTag('market')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);
  // console.log('____ENV____', process.env.PORT);
  await app.listen(3000);
}
bootstrap();
