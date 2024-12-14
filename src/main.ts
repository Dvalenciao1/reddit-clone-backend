import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HTTPExceptionFilter } from './common/filters/HttpExceptions.filter';
import { TypeORMErrorFilter } from './common/filters/TypeORMErrors.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HTTPExceptionFilter(), new TypeORMErrorFilter());
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
