import Attribute from "../Attribute";

describe("Attribute class", () => {
  describe("Successful path", () => {
    it("is succesfully initialized with a name and receives defaults", () => {
      const attribute = new Attribute({ name: "text" });
      expect(attribute.name).toEqual("text");
      expect(attribute.type).toEqual(Attribute.type.any);
    });

    describe("Supported types", () => {
      it("supports type 'any'", () => {
        const attribute = new Attribute({
          name: "text",
          type: Attribute.type.any
        });
        expect(attribute.type).toEqual(Attribute.type.any);
        expect(attribute.value).toEqual(undefined);
      });
      it("supports type 'boolean'", () => {
        const attribute = new Attribute({
          name: "done",
          type: Attribute.type.boolean,
          value: false
        });
        expect(attribute.type).toEqual(Attribute.type.boolean);
        expect(attribute.value).toEqual(false);
      });
      it("supports type 'date'", () => {
        const now = new Date();
        const attribute = new Attribute({
          name: "created",
          type: Attribute.type.date,
          value: now
        });
        expect(attribute.type).toEqual(Attribute.type.date);
        expect(attribute.value).toEqual(now);
      });
      it("supports type 'number'", () => {
        const attribute = new Attribute({
          name: "count",
          type: Attribute.type.number,
          value: 12
        });
        expect(attribute.type).toEqual(Attribute.type.number);
        expect(attribute.value).toEqual(12);
      });
      it("supports type 'string'", () => {
        const attribute = new Attribute({
          name: "text",
          type: Attribute.type.string,
          value: "Work on Jaypie"
        });
        expect(attribute.type).toEqual(Attribute.type.string);
        expect(attribute.value).toEqual("Work on Jaypie");
      });
    });

    describe("Updating values", () => {
      const before = new Date("March 14, 2015 09:26:53");
      const now = new Date();
      it("allows updating 'any' fields", () => {
        const attribute = new Attribute({
          name: "wildcard",
          type: Attribute.type.any,
          value: null
        });
        expect(attribute.value).toEqual(null);
        attribute.value = true;
        expect(attribute.value).toEqual(true);
        attribute.value = now;
        expect(attribute.value).toEqual(now);
        attribute.value = 12;
        expect(attribute.value).toEqual(12);
        attribute.value = "Work on Jaypie";
        expect(attribute.value).toEqual("Work on Jaypie");
      });
      it("allows updating boolean fields", () => {
        const attribute = new Attribute({
          name: "done",
          type: Attribute.type.boolean,
          value: false
        });
        expect(attribute.value).toEqual(false);
        attribute.value = true;
        expect(attribute.value).toEqual(true);
      });
      it("allows updating date fields", () => {
        const attribute = new Attribute({
          name: "created",
          type: Attribute.type.date,
          value: now
        });
        expect(attribute.value).toEqual(now);
        attribute.value = before;
        expect(attribute.value).toEqual(before);
      });
      it("allows updating number fields", () => {
        const attribute = new Attribute({
          name: "count",
          type: Attribute.type.number,
          value: 12
        });
        expect(attribute.value).toEqual(12);
        attribute.value = 144;
        expect(attribute.value).toEqual(144);
      });
      it("allows updating string fields", () => {
        const attribute = new Attribute({
          name: "text",
          type: Attribute.type.string,
          value: "Work on Jaypie"
        });
        expect(attribute.value).toEqual("Work on Jaypie");
        attribute.value = "Finish Jaypie";
        expect(attribute.value).toEqual("Finish Jaypie");
      });
    });
  });
  describe("Error cases", () => {
    it("requires name", () => {
      expect(() => {
        const attribute = new Attribute();
        expect(attribute.name).toBeDefined();
      }).toThrow();
    });
    it("requires name to be a string", () => {
      expect(() => {
        const attribute = new Attribute({ name: false });
        expect(attribute.name).toBeDefined();
      }).toThrow();
    });
    it("requires 'type' to be a valid type", () => {
      expect(() => {
        const attribute = new Attribute({ name: "text", type: "bogus" });
        expect(attribute.name).toBeDefined();
      }).toThrow();
    });
    describe("Attribute errors: enforces type values during initialization", () => {
      it("Enforces boolean type", () => {
        expect(() => {
          const attribute = new Attribute({
            name: "done",
            type: Attribute.type.boolean,
            value: "Hello"
          });
          expect(attribute.name).toBeDefined();
        }).toThrow();
      });
      it("Enforces number type", () => {
        expect(() => {
          const attribute = new Attribute({
            name: "count",
            type: Attribute.type.number,
            value: null
          });
          expect(attribute.name).toBeDefined();
        }).toThrow();
      });
      it("Enforces date type", () => {
        expect(() => {
          const attribute = new Attribute({
            name: "created",
            type: Attribute.type.date,
            value: null
          });
          expect(attribute.name).toBeDefined();
        }).toThrow();
      });
      it("Enforces string type", () => {
        expect(() => {
          const attribute = new Attribute({
            name: "text",
            type: Attribute.type.string,
            value: true
          });
          expect(attribute.name).toBeDefined();
        }).toThrow();
      });
    });
    describe("Attribute errors: enforces type values when values are set", () => {
      it("enforces boolean types", () => {
        const attribute = new Attribute({
          name: "done",
          type: Attribute.type.boolean,
          value: false
        });
        expect(() => {
          attribute.value = null;
        }).toThrow();
      });
      it("enforces date types", () => {
        const attribute = new Attribute({
          name: "created",
          type: Attribute.type.date,
          value: new Date()
        });
        expect(() => {
          attribute.value = null;
        }).toThrow();
      });
      it("enforces number types", () => {
        const attribute = new Attribute({
          name: "count",
          type: Attribute.type.number,
          value: 12
        });
        expect(() => {
          attribute.value = null;
        }).toThrow();
      });
      it("enforces string types", () => {
        const attribute = new Attribute({
          name: "text",
          type: Attribute.type.string,
          value: "Work on Jaypie"
        });
        expect(() => {
          attribute.value = null;
        }).toThrow();
      });
    });
    describe("Attribute errors: read-only fields", () => {
      it("doesn't allow setting name", () => {
        const attribute = new Attribute({ name: "text" });
        expect(attribute.name).toEqual("text");
        expect(() => {
          attribute.name = "Hello";
        }).toThrow();
        expect(attribute.name).toEqual("text");
      });
      it("doesn't allow setting type", () => {
        const attribute = new Attribute({ name: "text" });
        expect(attribute.type).toEqual(Attribute.type.any);
        expect(() => {
          attribute.type = Attribute.type.string;
        }).toThrow();
        expect(attribute.type).toEqual(Attribute.type.any);
      });
    });
  });
  describe("Aesthetics", () => {
    const attribute = new Attribute({
      name: "text",
      type: Attribute.type.string,
      value: "Work on Jaypie"
    });
    it("Converts to a string", () => {
      expect(attribute.toString()).not.toEqual("[object Object]");
      expect(attribute.toString()).toEqual(
        `Attribute: (STRING) text="Work on Jaypie"`
      );
    });
    it("Allows you to iterate keys", () => {
      const keys = Object.keys(attribute);
      expect(keys).toEqual(["name", "type", "value"]);
    });
  });
});
