import { LoggerService } from '@/logger/logger.service';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerHTTPInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const { method, url } = req;
    const { statusCode: status } = res;
    const logger = new LoggerService(className);

    logger.log(`[${method}] - Enter Message ${JSON.stringify({ url, function1: methodName })} `);

    return next.handle().pipe(
      tap(() => {
        logger.log(`[${method}] - Leave Message ${JSON.stringify({ url, function: methodName, status })} `);
      }),
    );
  }
}
