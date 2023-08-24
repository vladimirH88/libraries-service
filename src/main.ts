import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { join } from 'path';

import { useContainer } from 'class-validator';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setBaseViewsDir(join(__dirname, '../views'));
  app.setViewEngine('pug');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Libraries API')
    .setDescription('The libraries API description')
    .setVersion('1.0')
    .build();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT') || 5000;
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(parseInt(port));
}
bootstrap();
