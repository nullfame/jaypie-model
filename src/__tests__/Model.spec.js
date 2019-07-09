import Model from "../Model";

describe("TodoItem from Model.new", () => {
  let TestModel;

  describe("Using configured attributes array", () => {
    describe("Without types", () => {
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

    describe("With types", () => {
      it.todo("supports type any");
      it.todo("supports type boolean");
      it.todo("supports type date");
      it.todo("supports type number");
      it.todo("supports type string");
    });

    describe("Error cases with configured attributes array", () => {
      it("throws if attribute is missing a name", () => {
        expect(() => {
          TestModel = Model.new([{ default: false }]);
          // eslint-disable-next-line no-unused-vars
          const item = new TestModel(); // Should throw
        }).toThrow();
      });
      it("throws if attribute isn't string or object", () => {
        expect(() => {
          TestModel = Model.new([1]);
          // eslint-disable-next-line no-unused-vars
          const item = new TestModel(); // Should throw
        }).toThrow();
      });
    });

    it.todo("throws if default value doesn't match type");
    it.todo("throws if setting values don't match type");
  }); // "Using configured attributes array"

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
