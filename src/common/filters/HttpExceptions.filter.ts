import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

@Catch(HttpException)
export class HTTPExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HTTPExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const msg = exception.getResponse();

    this.logger.error(`Status: ${status} Error:${JSON.stringify(msg)}`);
    response.status(status).json({ time: new Date().toISOString(), path: request.url, error: msg });
  }
}
