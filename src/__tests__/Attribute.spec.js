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
          name: "text",
          type: Attribute.type.boolean,
          value: false
        });
        expect(attribute.type).toEqual(Attribute.type.boolean);
        expect(attribute.value).toEqual(false);
      });
      it("supports type 'date'", () => {
        const now = new Date();
        const attribute = new Attribute({
          name: "text",
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
    describe("Attribute errors: enforces type values", () => {
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
});
