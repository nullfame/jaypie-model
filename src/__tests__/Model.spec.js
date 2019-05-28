import Model from "../Model";

describe("TodoItem from Model.new", () => {
  let TestModel;

  describe("Using configured attributes", () => {
    beforeEach(() => {
      TestModel = Model.new([
        { name: "text", default: null },
        { name: "done", default: false }
      ]);
    });
    it("should allow default values", () => {
      const item = new TestModel();
      expect(item.text).toEqual(null);
      expect(item.done).toEqual(false);
    });
    it("allows state to be changed", () => {
      const item = new TestModel();
      item.text = "My Item";
      item.done = true;
      expect(item.text).toEqual("My Item");
      expect(item.done).toEqual(true);
    });
  });

  describe("Using attributes array of strings (becoming untyped variables, defaulting to undefined)", () => {
    beforeEach(() => {
      TestModel = Model.new(["text", "done"]);
    });
    it("should have a default state of undefined", () => {
      const item = new TestModel();
      expect(item.text).toEqual(undefined);
      expect(item.done).toEqual(undefined);
    });
    it("should accept initial values", () => {
      const item = new TestModel({ text: "My Item", done: false });
      expect(item.text).toEqual("My Item");
      expect(item.done).toEqual(false);
    });
  });
});
