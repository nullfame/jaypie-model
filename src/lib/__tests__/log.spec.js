import log from "../log";

describe("Log Library", () => {
  it("Supports trace log level", () => {
    const spy = jest.spyOn(console, "info").mockImplementation();
    log.trace("trace");
    // eslint-disable-next-line no-console
    expect(console.info).toBeCalled();
    spy.mockRestore();
  });
  it("Supports debug log level", () => {
    const spy = jest.spyOn(console, "info").mockImplementation();
    log.debug("debug");
    // eslint-disable-next-line no-console
    expect(console.info).toBeCalled();
    spy.mockRestore();
  });
  it("Supports info log level", () => {
    const spy = jest.spyOn(console, "info").mockImplementation();
    log.info("info");
    // eslint-disable-next-line no-console
    expect(console.info).toBeCalled();
    spy.mockRestore();
  });
  it("Supports warn log level", () => {
    const spy = jest.spyOn(console, "warn").mockImplementation();
    log.warn("warn");
    // eslint-disable-next-line no-console
    expect(console.warn).toBeCalled();
    spy.mockRestore();
  });
  it("Supports error log level", () => {
    const spy = jest.spyOn(console, "error").mockImplementation();
    log.error("error");
    // eslint-disable-next-line no-console
    expect(console.error).toBeCalled();
    spy.mockRestore();
  });
  it("Supports fatal log level", () => {
    const spy = jest.spyOn(console, "error").mockImplementation();
    log.fatal("fatal");
    // eslint-disable-next-line no-console
    expect(console.error).toBeCalled();
    spy.mockRestore();
  });
  it("Supports status logging", () => {
    const spyConsoleInfo = jest.spyOn(console, "info").mockImplementation();
    const spyConsoleLog = jest.spyOn(console, "log").mockImplementation();
    log.status("info", "debug");
    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalled();
    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalled();
    spyConsoleInfo.mockRestore();
    spyConsoleLog.mockRestore();
  });
  it("Supports dynamic log level setting", () => {
    const spy = jest.spyOn(console, "error").mockImplementation();
    log.set(log.level.silent);
    log.fatal("fatal");
    // eslint-disable-next-line no-console
    expect(console.error).not.toBeCalled();
    spy.mockRestore();
  });
});
