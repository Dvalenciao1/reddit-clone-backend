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
        paddingTime,
        paddingClass,
      }: {
        timestamp: string;
        level: string;
        message: string;
        trace: string;
        paddingTime: number;
        paddingClass: number;
      }) => {
        const className = trace !== 'undefined' && trace ? trace : this.context;
        const levelUpperCase = level.toUpperCase();
        const customLevelColor = `${Colors[levelUpperCase]} ${level.toUpperCase()} ${Colors.RESET}`;
        const classFormatter = `\x1b[33m[${className}]${Colors.RESET}`;

        return ` ${String(timestamp).padEnd(paddingTime)}${customLevelColor} ${classFormatter.padEnd(paddingClass)} ${message}`;
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
    this.loggerInfo.info(messageWithColor, { trace, paddingTime: 25, paddingClass: 32 });
  }

  error(message: string, trace?: string) {
    const messageWithColor = `${Colors.ERROR} ${message} ${Colors.RESET}`;
    this.loggerError.error(messageWithColor, { data: trace ? trace : this.context, paddingTime: 24, paddingClass: 32 });
  }
  warn(message: string, trace?: string) {
    const messageWithColor = `${Colors.ERROR} ${message} ${Colors.RESET}`;
    this.loggerWarn.warn(messageWithColor, { data: trace ? trace : this.context, paddingTime: 25, paddingClass: 32 });
  }
  debug(message: string, trace?: string) {
    const messageWithColor = `${Colors.DEBUG} ${message} ${Colors.RESET}`;
    this.loggerDebug.debug(messageWithColor, { data: trace ? trace : this.context, paddingTime: 24, paddingClass: 32 });
  }
}
