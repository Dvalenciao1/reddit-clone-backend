import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HTTPExceptionFilter } from '@/common/filters/HttpExceptions.filter';
import { TypeORMErrorFilter } from '@/common/filters/TypeORMErrors.filter';
import { configEnv } from '@/config';

async function bootstrap() {
  let logger = new Logger(NestApplication.name);
  const app = await NestFactory.create(AppModule);
  const corsOptions = {  };
  app.enableCors();
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
    logger.verbose(`Server is running on ${configEnv.host}:${configEnv.port}/${configEnv.prefix}`);
  });
}
bootstrap();
