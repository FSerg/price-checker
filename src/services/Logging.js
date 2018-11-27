import { createLogger, format, transports } from 'winston';

let loglevel = 'debug';
if (process.env.NODE_ENV === 'production') {
  loglevel = 'error';
}

const log = createLogger({
  level: loglevel,
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()]
});

export default log;
