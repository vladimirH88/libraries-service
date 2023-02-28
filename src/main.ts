import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.setBaseViewsDir(join(__dirname, '../views'));
  app.setViewEngine('pug');

  const port = configService.get('PORT') || 3000;
  await app.listen(parseInt(port));
}
bootstrap();
