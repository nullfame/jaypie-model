import log from "../log";

describe("Log Library", () => {
  it("Supports different log levels", () => {
    log.trace("Trace");
    log.debug("Debug");
    log.info("Info");
    log.warn("Warn");
    log.error("Error");
    log.fatal("Fatal");
  });
});
