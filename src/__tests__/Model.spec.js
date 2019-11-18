import Model from "../Model";

describe("TodoItem from Model.new", () => {
  let TestModel;

  describe("Using object configuration", () => {
    beforeEach(() => {
      TestModel = Model.new({
        attributes: [
          { name: "text", default: null },
          { name: "done", default: false }
        ]
      });
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
    }); // END "Without types" in "Using configured attributes array"

    describe("With types", () => {
      it("supports type any", () => {
        const now = new Date();
        TestModel = Model.new([
          { name: "junk", default: null, type: Model.type.any }
        ]);
        const item = new TestModel();
        expect(item.junk).toEqual(null);
        item.junk = true;
        expect(item.junk).toEqual(true);
        item.junk = now;
        expect(item.junk).toEqual(now);
        item.junk = 12;
        expect(item.junk).toEqual(12);
        item.junk = "Work on Jaypie";
        expect(item.junk).toEqual("Work on Jaypie");
      });
      it("supports type boolean", () => {
        TestModel = Model.new([
          { name: "done", default: false, type: Model.type.boolean }
        ]);
        const item = new TestModel();
        expect(item.done).toEqual(false);
        item.done = true;
        expect(item.done).toEqual(true);
        expect(() => {
          item.done = null;
        }).toThrow();
      });
      it("supports type date", () => {
        const before = new Date("March 14, 2015 09:26:53");
        const now = new Date();

        TestModel = Model.new([
          { name: "updated", default: before, type: Model.type.date }
        ]);
        const item = new TestModel();
        expect(item.updated).toEqual(before);
        item.updated = now;
        expect(item.updated).toEqual(now);
        expect(() => {
          item.updated = null;
        }).toThrow();
      });
      it("supports type number", () => {
        TestModel = Model.new([
          { name: "count", default: 12, type: Model.type.number }
        ]);
        const item = new TestModel();
        expect(item.count).toEqual(12);
        item.count = 144;
        expect(item.count).toEqual(144);
        expect(() => {
          item.count = null;
        }).toThrow();
      });
      it("supports type string", () => {
        TestModel = Model.new([
          { name: "text", default: "todo", type: Model.type.string }
        ]);
        const item = new TestModel({ text: "Work on Jaypie" });
        expect(item.text).toEqual("Work on Jaypie");
        item.text = "Finish Jaypie";
        expect(item.text).toEqual("Finish Jaypie");
        expect(() => {
          item.text = null;
        }).toThrow();
      });
    }); // END "With types" in "Using configured attributes array"

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
      it("throws if default value doesn't match type", () => {
        expect(() => {
          TestModel = Model.new([
            { name: "text", default: false, type: Model.type.string }
          ]);
        }).toThrow();
      });
      it("throws if accessing an unset attribute", () => {
        expect(() => {
          TestModel = Model.new([
            { name: "text", default: "todo", type: Model.type.string }
          ]);
          const item = new TestModel({ text: "Work on Jaypie" });
          item.done = true;
        }).toThrow();
      });
      it("throws if using a reserved attribute name", () => {
        expect(() => {
          TestModel = Model.new([{ name: "inspect" }]);
        }).toThrow();
      });
    }); // END "Error cases with configured attributes array" in "Using configured attributes array"
  }); // END "Using configured attributes array"

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

    it("throws if using a reserved attribute name", () => {
      expect(() => {
        TestModel = Model.new(["text", "done", "inspect"]);
      }).toThrow();
    });
  }); // END "Using attributes array of strings (becoming untyped variables, defaulting to undefined)"

  describe("Aesthetics", () => {
    TestModel = Model.new([
      { name: "text", type: Model.type.string },
      { name: "done", type: Model.type.boolean, default: false }
    ]);
    const item = new TestModel({ text: "Work on Jaypie" });

    it("Shows gettable/settable private attributes as members", () => {
      const keys = Object.keys(item);
      expect(keys).toEqual(["text", "done"]);
    });

    it("Returns attribute values in property descriptors", () => {
      const keys = Object.keys(item);
      expect(keys).toEqual(["text", "done"]);
      const textPropertyDescriptor = Object.getOwnPropertyDescriptor(
        item,
        "text"
      );
      expect(textPropertyDescriptor.value).toEqual("Work on Jaypie");
      const donePropertyDescriptor = Object.getOwnPropertyDescriptor(
        item,
        "done"
      );
      expect(donePropertyDescriptor.value).toEqual(false);
    });
    it("Converts instances to a string", () => {
      const itemString = item.toString();
      expect(itemString).not.toEqual("[object Object]");
      expect(itemString).toEqual(`[Model: text="Work on Jaypie" done="false"]`);
    });
    it("Converts the Model class to a string", () => {
      const modelString = TestModel.toString();
      expect(modelString).toEqual(`[Class: Model]`);
      // expect(modelString).toEqual([Model: text=${Model.type.string} done=${Model.type.boolean}]`);
    });
  }); // END describe Aesthetics

  describe("General error cases", () => {
    it("Throws when configuration is not array or object", () => {
      expect(() => {
        TestModel = Model.new(12);
      }).toThrow("Invalid Configuration: 12");
    });
    it("Throws when attributes are missing from configuration object", () => {
      expect(() => {
        TestModel = Model.new({});
      }).toThrow("Invalid Configuration");
    });
    it("Throws when attributes array is empty", () => {
      expect(() => {
        TestModel = Model.new({ attributes: [] });
      }).toThrow("attribute array cannot be empty");
    });
  });
}); // END "TodoItem from Model.new"
