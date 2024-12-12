import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch()
export class HTTPExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HTTPExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof Error
          ? HttpStatus.UNPROCESSABLE_ENTITY
          : HttpStatus.INTERNAL_SERVER_ERROR;
    const msg =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof Error
          ? exception.message
          : 'Internal Server Error';

    this.logger.error(`Status: ${status} Error:${JSON.stringify(msg)}`);
    response
      .status(status)
      .json({ time: new Date().toISOString(), path: request.url, error: msg });
  }
}
