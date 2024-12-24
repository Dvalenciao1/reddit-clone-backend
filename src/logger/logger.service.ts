import { Injectable } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { Colors } from '@/utils/enum/colors.enum';

@Injectable()
export class LoggerService {
  private loggerInfo: Logger;
  private loggerError: Logger;
  private loggerWarn: Logger;
  private loggerDebug: Logger;
  private context: string = ' ';

  constructor(context?: string) {
    this.createLoggers();
    this.context = context;
  }

  createLoggers() {
    const textFormat = format.printf(
      ({
        timestamp,
        level,
        message,
        trace,
        sizePadding,
      }: {
        timestamp: string;
        level: string;
        message: string;
        trace: string;
        sizePadding: number;
      }) => {
        const className = trace !== 'undefined' && trace ? trace : this.context;
        const levelUpperCase = level.toUpperCase();
        const customLevelColor = `${Colors[levelUpperCase]} ${level.toUpperCase()} ${Colors.RESET}`;
        const classFormatter = `\x1b[33m[${className}]${Colors.RESET}`;
        const padding = sizePadding;

        return ` ${String(timestamp).padEnd(padding)}${customLevelColor} ${classFormatter} ${message}`;
      },
    );

    const dateFormate = format.timestamp({
      format: 'MM/DD/YYYY, h:mm:ss A',
    });

    this.loggerInfo = createLogger({
      level: 'info',
      format: format.combine(dateFormate, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'log/info/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
        }),
        new transports.Console(),
      ],
    });

    this.loggerError = createLogger({
      level: 'error',
      format: format.combine(dateFormate, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'log/error/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
        }),
        new transports.Console(),
      ],
    });
    this.loggerWarn = createLogger({
      level: 'warn',
      format: format.combine(dateFormate, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'log/warn/warn-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
        }),
        new transports.Console(),
      ],
    });
    this.loggerDebug = createLogger({
      level: 'debug',
      format: format.combine(dateFormate, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'log/debug/debug-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
        }),
        new transports.Console(),
      ],
    });
  }

  log(message: string, trace?: string) {
    const messageWithColor = `${Colors.INFO} ${message} ${Colors.RESET}`;
    this.loggerInfo.info(messageWithColor, { trace, sizePadding: 25 });
  }

  error(message: string, trace?: string) {
    const messageWithColor = `${Colors.ERROR} ${message} ${Colors.RESET}`;
    this.loggerError.error(messageWithColor, { data: trace ? trace : this.context, sizePadding: 24 });
  }
  warn(message: string, trace?: string) {
    const messageWithColor = `${Colors.ERROR} ${message} ${Colors.RESET}`;
    this.loggerWarn.warn(messageWithColor, { data: trace ? trace : this.context, sizePadding: 25 });
  }
  debug(message: string, trace?: string) {
    const messageWithColor = `${Colors.DEBUG} ${message} ${Colors.RESET}`;
    this.loggerDebug.debug(messageWithColor, { data: trace ? trace : this.context, sizePadding: 24 });
  }
}
