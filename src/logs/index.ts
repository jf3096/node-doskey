import * as winston from 'winston';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: 'all',
      level: `debug`,
    })
  ]
});

export default class Logger {
  public static log(message: any): void {
    // tslint:disable
    console.log(message);
    // tslint:enable
  }

  public static info(message: any): void {
    logger.log('info', message);
  }

  public static debug(message: any): void {
    logger.log('debug', message);
  }

  public static error(message: any): void {
    logger.log('error', message);
  }
}
