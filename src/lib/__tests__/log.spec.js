import log from "../log";

describe("Log Library", () => {
  it("Supports trace log level", () => {
    log.set(log.level.trace);
    const spy = jest.spyOn(console, "log").mockImplementation();
    log.trace("trace");
    // eslint-disable-next-line no-console
    expect(console.log).toBeCalled();
    spy.mockRestore();
  });
  it("Supports debug log level", () => {
    log.set(log.level.debug);
    const spy = jest.spyOn(console, "log").mockImplementation();
    log.debug("debug");
    // eslint-disable-next-line no-console
    expect(console.log).toBeCalled();
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
    const spyError = jest.spyOn(console, "error").mockImplementation();
    const spyLog = jest.spyOn(console, "log").mockImplementation();

    // Set to silent
    log.set(log.level.silent);
    log.fatal("fatal");
    log.trace("trace");
    // eslint-disable-next-line no-console
    expect(console.error).not.toBeCalled();
    // eslint-disable-next-line no-console
    expect(console.log).not.toBeCalled();

    // Set to all
    log.set(log.level.all);
    log.trace("trace");
    // eslint-disable-next-line no-console
    expect(console.log).toBeCalled();

    spyError.mockRestore();
    spyLog.mockRestore();
  });
  it("Supports aesthetic dynamic log level setting", () => {
    const spyError = jest.spyOn(console, "error").mockImplementation();
    const spyLog = jest.spyOn(console, "log").mockImplementation();

    // Set to silent
    log.set(log.silent);
    log.fatal("fatal");
    log.trace("trace");
    // eslint-disable-next-line no-console
    expect(console.error).not.toBeCalled();
    // eslint-disable-next-line no-console
    expect(console.log).not.toBeCalled();

    // Set to all
    log.set(log.trace);
    log.trace("trace");
    // eslint-disable-next-line no-console
    expect(console.log).toBeCalled();

    spyError.mockRestore();
    spyLog.mockRestore();
  });
  it("Defaults to info when passed bogus function", () => {
    const spyError = jest.spyOn(console, "error").mockImplementation();
    const spyLog = jest.spyOn(console, "log").mockImplementation();

    // Set to silent
    log.set(log.silent);
    log.fatal("fatal");
    log.trace("trace");
    // eslint-disable-next-line no-console
    expect(console.error).not.toBeCalled();
    // eslint-disable-next-line no-console
    expect(console.log).not.toBeCalled();

    // Set to bogus function
    log.set(x => x);
    log.fatal("fatal");
    log.trace("trace");
    // eslint-disable-next-line no-console
    expect(console.error).toBeCalled();
    // eslint-disable-next-line no-console
    expect(console.log).not.toBeCalled();

    spyError.mockRestore();
    spyLog.mockRestore();
  });
  it("Defaults to info when level isn't numeric or function", () => {
    const spyError = jest.spyOn(console, "error").mockImplementation();
    const spyLog = jest.spyOn(console, "log").mockImplementation();

    // Set to object
    log.set({});
    log.fatal("fatal");
    log.trace("trace");
    // eslint-disable-next-line no-console
    expect(console.error).toBeCalled();
    // eslint-disable-next-line no-console
    expect(console.log).not.toBeCalled();

    spyError.mockRestore();
    spyLog.mockRestore();
  });
  it("Defaults to info when level isn't unsupported numeric", () => {
    const spyError = jest.spyOn(console, "error").mockImplementation();
    const spyLog = jest.spyOn(console, "log").mockImplementation();

    // Set to object
    log.set(0.5);
    log.fatal("fatal");
    log.trace("trace");
    // eslint-disable-next-line no-console
    expect(console.error).toBeCalled();
    // eslint-disable-next-line no-console
    expect(console.log).not.toBeCalled();

    spyError.mockRestore();
    spyLog.mockRestore();
  });
});
