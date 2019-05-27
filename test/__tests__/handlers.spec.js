import { testHandler } from "../handlers";

describe("Handler response", () => {
  const actualResponse = testHandler();

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
