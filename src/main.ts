import { NestApplication, NestApplicationContext, NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { HTTPExceptionFilter } from '@/common/filters/HttpExceptions.filter';
import { TypeORMErrorFilter } from '@/common/filters/TypeORMErrors.filter';
import { configEnv } from '@/config';
import { LoggerHTTPInterceptor } from './common/interceptor/logger.interceptor';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const logger = new LoggerService(NestApplication.name);
  const app = await NestFactory.create(AppModule, { logger: logger });
  const corsOptions = { origin: ['http://localhost:3001'] };

  app.enableCors(corsOptions);
  app.useGlobalInterceptors(new LoggerHTTPInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HTTPExceptionFilter(), new TypeORMErrorFilter());
  app.setGlobalPrefix(configEnv.prefix);
  await app.listen(3000, () => {
    logger.log(`Server is running on ${configEnv.host}:${configEnv.port}/${configEnv.prefix} \n`);
    
  });
}
bootstrap();
