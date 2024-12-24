import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { TypeORMExceptions } from '@/common/errors/ORM/TypeOrmErrors';
import { TypeORMError } from 'typeorm';
import { LoggerService } from '@/logger/logger.service';

@Catch(TypeORMError)
export class TypeORMErrorFilter implements ExceptionFilter {
  private readonly logger = new LoggerService();

  catch(exception: TypeORMExceptions, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = HttpStatus.UNPROCESSABLE_ENTITY;
    const msg = exception;
    const error = msg.driverError as any;

    this.logger.error(
      `[Status: ${status}] - Path: ${request.url} - Error:${JSON.stringify({ message: error.message, code: error.code, errno: error.errno, sqlState: error.sqlState })} `,
    );
    response.status(status).json({
      time: new Date().toISOString(),
      path: request.url,
      error: { message: error.message, code: error.code, errno: error.errno, sqlState: error.sqlState },
    });
  }
}
