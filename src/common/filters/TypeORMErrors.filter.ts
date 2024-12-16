import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { TypeORMExceptions } from '@/common/errors/ORM/TypeOrmErrors';

@Catch(TypeORMExceptions)
export class TypeORMErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeORMErrorFilter.name);

  catch(exception: TypeORMExceptions, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = HttpStatus.UNPROCESSABLE_ENTITY;
    const msg = exception;
    const error = msg.driverError;
    const sqlStatus = msg.errorDetails.status;
    const ormCode = msg.errorDetails.code;

    this.logger.error(`Status: ${status} Error:${JSON.stringify(msg)}`);
    response.status(status).json({
      time: new Date().toISOString(),
      path: request.url,
      error: msg.driverError,
      details: { sqlStatus, ormCode },
    });
  }
}
