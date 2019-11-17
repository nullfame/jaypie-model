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

let logLevel =
  Object.keys(levels).indexOf(process.env.LOG_LEVEL) > -1
    ? levels[process.env.LOG_LEVEL]
    : levels.info;

const debug = levels.debug >= logLevel;
const silent = logLevel === levels.silent;

const dev = process.env.LOG_PRETTY_PRINT === "true";

const logger = new log.LambdaLog(
  { debug, dev, silent },
  {
    fatal: "error"
  }
);

function checkLogLevel(testLevel) {
  return logLevel <= testLevel;
}

const logPrimitives = {
  fatal: message => {
    if (checkLogLevel(levels.fatal)) logger.fatal(message);
  },
  error: message => {
    if (checkLogLevel(levels.error)) logger.error(message);
  },
  warn: message => {
    if (checkLogLevel(levels.warn)) logger.warn(message);
  },
  info: message => {
    if (checkLogLevel(levels.info)) logger.info(message);
  },
  debug: message => {
    if (checkLogLevel(levels.debug)) logger.debug(message);
  },
  trace: message => {
    if (checkLogLevel(levels.trace)) logger.debug(message);
  }
};

export default {
  fatal: logPrimitives.fatal,
  error: logPrimitives.error,
  warn: logPrimitives.warn,
  info: logPrimitives.info,
  debug: logPrimitives.debug,
  trace: logPrimitives.trace,

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
  set: newLevel => {
    logLevel = newLevel;
  }
};
