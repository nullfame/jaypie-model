import log from "lambda-log";

const levels = { all: 0, trace: 1, debug: 2, info: 3, none: 99, silent: 99 };
const level =
  Object.keys(levels).indexOf(process.env.LOG_LEVEL) > -1
    ? levels[process.env.LOG_LEVEL]
    : levels.info;

const trace = levels.trace >= level;
const debug = levels.debug >= level;
const silent = level === levels.silent;

const dev = process.env.LOG_PRETTY_PRINT === "true";

export default new log.LambdaLog(
  { debug, dev, silent },
  {
    fatal: "error",
    trace: () => {
      if (trace) return "info";
      return false;
    }
  }
);