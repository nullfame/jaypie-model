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
      });
      it("supports type 'boolean'", () => {
        const attribute = new Attribute({
          name: "text",
          type: Attribute.type.boolean,
          value: false
        });
        expect(attribute.type).toEqual(Attribute.type.boolean);
      });
      it("supports type 'date'", () => {
        const attribute = new Attribute({
          name: "text",
          type: Attribute.type.date,
          value: new Date()
        });
        expect(attribute.type).toEqual(Attribute.type.date);
      });
      it("supports type 'number'", () => {
        const attribute = new Attribute({
          name: "count",
          type: Attribute.type.number,
          value: 12
        });
        expect(attribute.type).toEqual(Attribute.type.number);
      });
      it("supports type 'string'", () => {
        const attribute = new Attribute({
          name: "text",
          type: Attribute.type.string,
          value: "Work on Jaypie"
        });
        expect(attribute.type).toEqual(Attribute.type.string);
      });
    });
  });
  describe("Error cases", () => {
    it("requires name", () => {
      expect(() => {
        const attribute = new Attribute();
        attribute.name = "item";
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
  });
});
