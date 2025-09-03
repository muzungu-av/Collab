import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // Достаём ConfigService
  const config = app.get(ConfigService);
  const webappUrl = config.get<string>('WEBAPP_URL', '*'); // '*' — fallback
  const PORT = config.get<string>('PORT', '9999');

  if (!webappUrl) {
    console.error('*********************************');
    console.error('***** WEBAPP_URL не найден! *****');
    console.error('*********************************');
    process.exit(1);
  } else {
    console.error('*********************************');
    console.error(`    WEBAPP_URL = ${webappUrl}`);
    console.error('*********************************');
  }

  app.enableCors({
    origin: webappUrl,
    credentials: true,
  });
  // включаем проверку dto в запросах глобально
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api'); //все запросы должны отправляться на /api
  app.useLogger(new Logger());
  await app.listen(PORT);
}
bootstrap();
