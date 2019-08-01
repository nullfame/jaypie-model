import log from "lambda-log";

const levels = {
  all: 0,
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
  fatal: 6,
  none: 99,
  silent: 99
};

const level =
  Object.keys(levels).indexOf(process.env.LOG_LEVEL) > -1
    ? levels[process.env.LOG_LEVEL]
    : levels.info;

const debug = levels.debug >= level;
const silent = level === levels.silent;

const dev = process.env.LOG_PRETTY_PRINT === "true";

const logger = new log.LambdaLog(
  { debug, dev, silent },
  {
    fatal: "error"
  }
);

export default {
  fatal: message => logger.fatal(message),
  error: message => logger.error(message),
  warn: message => logger.warn(message),
  info: message => logger.info(message),
  debug: message => logger.debug(message),
  trace: message => logger.debug(message),

  /**
   * Logs an info and debug message, subject to level settings
   * @param {any} infoMessage - message to log on info or lower level
   * @param {any} debugMessage - message to log in addition to info message, on debug or lower level
   */
  status: (infoMessage, debugMessage) => {
    logger.info(infoMessage);
    logger.debug(debugMessage);
  },

  /**
   * Allowed log levels
   */
  level: levels,

  /**
   * Update current log level
   */
  // eslint-disable-next-line no-unused-vars
  set: newLevel => {
    //
  }
};
