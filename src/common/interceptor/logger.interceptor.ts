import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerHTTPInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const logger = new Logger(`HTTP ${className}`);
    const { method, url } = req;
    const { statusCode: status } = res;

    logger.log(`[${method}] - Enter Message ${JSON.stringify({ url, function: methodName })} `);

    return next.handle().pipe(
      tap(() => {
        logger.log(`[${method}] - Leave Message ${JSON.stringify({ url, function: methodName, status })} `);
      }),
    );
  }
}
