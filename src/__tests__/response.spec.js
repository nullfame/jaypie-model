import { defaultHandler } from "..";

describe("Handler response", () => {
  const actualResponse = defaultHandler();

  it("should have a statusCode", () => {
    expect(actualResponse).toContainKey("statusCode");
  });
  it("should have headers", () => {
    expect(actualResponse).toContainKey("headers");
  });
  it("should have a body", () => {
    expect(actualResponse).toContainKey("body");
  });
  it("should have a JSON-encoded body", () => {
    const body = JSON.parse(actualResponse.body);
    expect(typeof body).toEqual(typeof {});
  });
});
